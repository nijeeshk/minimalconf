import React from 'react';
import {Redirect} from 'react-router-dom';
import Loader from '../widgets/Loader';
import {verifyToken} from '../../api/auth';

const getInitialState = () => ({
  authCheckComplete: false,
  authenticity: false,
  user: null,
});

const isAuthenticated = (ComposedComponent) => {
  return class AuthCheck extends React.Component {
    constructor(props) {
      super(props);
      this.state = getInitialState();
    }

    componentDidMount() {
      this.checkAuthentication();
    }

    checkAuthentication() {
      const ls = window.localStorage;
      if (ls) {
        const token = ls.getItem('token');
        if (token) {
          verifyToken().then((user) => {
            this.setState({
              authenticity: true,
              user,
              authCheckComplete: true,
            });
          }).catch(() => {
            ls.removeItem('token');
            this.setState({
              authenticity: false,
              user: null,
              authCheckComplete: true,
            });
          });
        } else {
          this.setState({
            authenticity: false,
            user: null,
            authCheckComplete: true,
          });
        }
      }
    }

    render() {
      const {authenticity, authCheckComplete, user} = this.state;
      if (authCheckComplete) {
        if (authenticity) {
          return <ComposedComponent { ...this.props } user={user} />;
        }
        return <Redirect to="/login" />;
      } else {
        return <Loader full />;
      }
    }
  };
};

export default isAuthenticated;
