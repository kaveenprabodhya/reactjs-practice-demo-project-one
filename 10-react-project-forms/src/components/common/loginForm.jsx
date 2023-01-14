import React, { Component } from "react";
import Input from "./input";

class LoginForm extends Component {
  username = React.createRef();

  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  /* componentDidMount() {
    this.username.current.focus();
  } */

  validate = () => {
    return { username: "Username is required." };
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    // this can prevent refreshing page
    // u can get input value by create a reference instead of document.getElementById("username").value;
    const username = this.username.current.value;

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    console.log("submitted");
  };

  /* handleOnChange = (e) => {
    const account = { ...this.state.account };
    // account.username = e.currentTarget.value;
    // use dynamically properties
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  }; */

  handleOnChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <div className="row">
          <div className="d-flex justify-content-center">
            <form className="col-8 mt-3" onSubmit={this.handleSubmitForm}>
              {/* <div className="form-group m-2">
                <label htmlFor="username">Username</label>
                <input
                  autoFocus
                  //   ref={this.username}
                  id="username"
                  name="username"
                  value={account.username}
                  onChange={this.handleOnChange}
                  type="text"
                  className="form-control mt-2"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group m-2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  value={account.password}
                  onChange={this.handleOnChange}
                  type="password"
                  className="form-control mt-2"
                  placeholder="Password"
                />
              </div> */}
              <Input
                name="username"
                value={account.username}
                label="Username"
                type="text"
                onChange={this.handleOnChange}
              />
              <Input
                name="password"
                value={account.password}
                label="Password"
                type="password"
                onChange={this.handleOnChange}
              />
              <div className="m-2">
                <button type="submit" className="btn btn-success mt-2 w-100">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
