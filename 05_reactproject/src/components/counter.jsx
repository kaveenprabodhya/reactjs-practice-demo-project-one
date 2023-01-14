import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: this.props.counter.value,
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleDecrement = () => {
    if (this.state.count <= 0) return null;
    this.setState({
      count: this.state.count - 1,
    });
  };

  render() {
    // console.log("props", this.props);
    let classes = this.getBadgeClasses();
    return (
      <div className="d-flex p-2">
        <div className="p-2">
          <h4>{this.props.id}</h4>
        </div>
        <div className="p-2">{this.props.children}</div>
        <div className="p-2">
          <span style={{ fontSize: 12 }} className={classes}>
            {this.formCount()}
          </span>
        </div>
        <div className="p-2">
          <button
            onClick={this.handleIncrement}
            className="btn btn-success btn-sm align-self-center"
          >
            Increment
          </button>
        </div>
        <div className="p-2">
          <button
            onClick={this.handleDecrement}
            className="btn btn-secondary btn-sm align-self-center"
          >
            Decrement
          </button>
        </div>
        <div className="p-2">
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm align-self-center"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  getBadgeClasses() {
    let classes = "align-self-center badge bg-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  formCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
