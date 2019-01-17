import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from 'reactstrap';
import {login} from '../../../api/auth';
import './Login.scss';

class Login extends Component {
  static defaultProps = {
    username: '',
    password: '',
    loading: false,
    errors: {
      uname: false,
      pass: false,
      message: '',
    },
  }

  static propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  state = {
    username: this.props.username,
    password: this.props.password,
    loading: this.props.loading,
    errors: this.props.errors,
  }

  componentDidMount() {
    window.localStorage.removeItem('token');
  }

  onInputChange = (val, key) => {
    this.setState({
      [key]: val,
    });
  }

  onSubmitLoginForm = (e) => {
    if (e && e.preventDefault && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    const {username, password} = this.state;
    const errors = {
      uname: false,
      pass: false,
      message: '',
    };
    let valid = true;
    if (!(username && username.trim())) {
      errors.uname = true;
      errors.message = 'Email and password are required.';
      valid = false;
    }
    if (!(password && password.trim())) {
      errors.pass = true;
      errors.message = 'Email and password are required.';
      valid = false;
    }
    if (valid) {
      this.setState({loading: true});
      login({
        body: {
          email: username,
          password,
        },
      }).then((data) => {
        window.localStorage.setItem('token', data.token);
        this.props.history.push('/');
      }).catch((e) => {
        let message = 'Internal Server Error!';
        if (e.response && e.response.status === 401) {
          message = 'Invalid username or password.';
        }
        this.setState({
          loading: false,
          errors: {
            uname: false,
            pass: false,
            message,
          },
        });
      });
    } else {
      this.setState({
        errors,
      });
    }
  }

  render() {
    const {
      username,
      password,
      loading,
      errors,
    } = this.state;
    return (
      <Container fluid id="page">
        <Row className="lgn-wrap align-items-center justify-content-center">
          <div className="lgn-box">
            <div className="hdr">
              <h1>Login</h1>
            </div>
            {errors.message &&
              <Alert color="danger">
                {errors.message}
              </Alert>
            }
            <Form className="lgn-form" onSubmit={this.onSubmitLoginForm}>
              <FormGroup>
                <Label for="uname-inp">Email</Label>
                <Input
                  id="uname-inp"
                  type="email"
                  className={
                    (errors.uname && !(username && username.trim())) ?
                    'red' :
                    ''
                  }
                  value={username}
                  onChange={(e) =>
                    this.onInputChange(e.target.value, 'username')}
                  autoFocus
                />
              </FormGroup>
              <FormGroup>
                <Label for="pass-inp">Password</Label>
                <Input
                  id="pass-inp"
                  type="password"
                  className={
                    (errors.pass && !(password && password.trim())) ?
                    'red' :
                    ''
                  }
                  value={password}
                  onChange={(e) =>
                    this.onInputChange(e.target.value, 'password')}
                />
              </FormGroup>
              <div className="submit">
                <Input
                  className="btn lgn-btn"
                  type="submit"
                  value="Login"
                  disabled={loading}
                />
              </div>
            </Form>
          </div>
        </Row>
      </Container>
    );
  }
}

export default Login;
