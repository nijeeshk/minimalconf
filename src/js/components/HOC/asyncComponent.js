import React, {Component} from 'react';
import Loader from '../widgets/Loader';

const getInitialState = () => ({
  Conponent: null,
});

export default function asyncComponent(getComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = getInitialState();
    }

    componentDidMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          this.setState({Component});
        });
      }
    }

    render() {
      const {Component} = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return <Loader full />;
    }
  }
  return AsyncComponent;
}
