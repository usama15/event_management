import React from 'react';
import Main from './Main_Screen';
import Home from './Home';

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: <Main />,
    };
  }

  componentDidMount() {
    // Start counting when the page is loaded
    this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
      this.setState({component: <Home />});
    }, 6000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return this.state.component;
  }
}