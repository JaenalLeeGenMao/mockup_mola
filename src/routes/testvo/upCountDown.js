import React, { Component } from 'react';

class UpcomingCountDown extends Component {
  state = { seconds: this.props.startSecond };

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds - 1
    }));
    if (this.state.seconds < 1) {
      clearInterval(this.interval);

      if (this.props.handleAfter) {
        this.props.handleAfter()
      }
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    // console.log("this.state.seconds", this.state.seconds)
    return (
      <span>
        {this.state.seconds}
      </span>
    );
  }
}

export default UpcomingCountDown;