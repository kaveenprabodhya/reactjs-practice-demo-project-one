import React, { Component } from "react";
import withToolTip from "./withTooltip";

class Movie extends Component {
  render() {
    return <div>Movie {this.props.showTooltip && <div>some tooltip</div>}</div>;
  }
}

export default withToolTip(Movie);
