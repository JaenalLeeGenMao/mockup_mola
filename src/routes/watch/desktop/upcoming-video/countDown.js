import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './countDown.css'

const circleRadius = 49;
const circumference = 2 * Math.PI * circleRadius;
class UpcomingCountDown extends Component {
  state = {
    seconds: this.props.startSecond,
    radius: circumference,
    durationLeftState: '',
    increment: 100 / this.props.startSecond,
    percent: 100 / this.props.startSecond
  };

  tick() {
    const { seconds, percent, increment } = this.state
    if (seconds <= 0) {
      this.setState({ radius: 0 });
      if (this.props.onTimeFinish) {
        this.props.onTimeFinish();
      }
      clearInterval(this.interval);
    } else {
      const radius = circumference - percent / 100 * circumference
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
        percent: prevState.percent + increment,
        radius
      }));
    }

    // 20s -  5 10 ... 80 90 1000 = 20x
    // 10s -  10 20 ... 100 = 10x
    // 5s  -  20 40 60 80 100 = 5x

    // if (this.state.seconds < 1) {
    //   clearInterval(this.interval);

    //   if (this.props.handleAfter) {
    //     this.props.handleAfter()
    //   }
    // }
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
      <div className={styles.container}>
        <div className={styles.animation_container}>
          <svg
            width="22"
            height="22"
            viewBox="-5 3 120 120"
            style={{ transform: 'rotate(-90deg)' }}
          >
            <circle
              r={circleRadius}
              cy="58"
              cx="60"
              strokeWidth="12"
              stroke="#666666"
              fill="none"
            />
            <circle
              className={`${styles.timeCount} circle_animation`}
              r={circleRadius}
              cy="58"
              cx="60"
              strokeWidth="12"
              stroke="#FFFFFF"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={this.state.radius}
            />
          </svg>
          <i />
        </div>
        <span>Play next movie in {this.state.seconds}</span>
      </div>
    );
  }
}

export default withStyles(styles)(UpcomingCountDown)