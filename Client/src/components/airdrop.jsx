import React, { Component } from "react";

class Airdrop extends Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 60 };
    this.timer = 0;
    this.startTime = this.startTimer.bind(this);
    this.countdown = this.countDown.bind(this);
  }

  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countdown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  secondsToTime(secs) {
    let hours, minutes, seconds;
    hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    seconds = Math.ceil(divisor_for_seconds / 60);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  airdropReleaseTokens() {
    let stakingB = this.props.stakingBalance;
    if (stakingB >= "50000000000000000000") {
      this.startTimer();
    }
  }

  render() {
    this.airdropReleaseTokens();
    return (
      <div style={{ color: "black" }}>
        {this.state.time.m}:{this.state.seconds}
      </div>
    );
  }
}

export default Airdrop;
