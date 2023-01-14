import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";

class LoginForm extends Component {
  username = React.createRef();

  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    /* const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    }); */
    // console.log(result);

    /* const errors = {};
    // using object destructuring
    const { account } = this.state;
    if (account.username.trim() === "") {
      errors.username = "Username is required.";
    }
    if (account.password.trim() === "") {
      errors.password = "Password is required.";
    }
    return Object.keys(errors).length === 0 ? null : errors; */

    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmitForm = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
  };

  /* validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required.";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required.";
    }
  }; */

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleOnChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <div className="row">
          <div className="d-flex justify-content-center">
            <form className="col-8 mt-3" onSubmit={this.handleSubmitForm}>
              <Input
                name="username"
                value={account.username}
                label="Username"
                type="text"
                onChange={this.handleOnChange}
                error={errors.username}
              />
              <Input
                name="password"
                value={account.password}
                label="Password"
                type="password"
                onChange={this.handleOnChange}
                error={errors.password}
              />
              <div className="m-2">
                <button
                  disabled={this.validate()}
                  type="submit"
                  className="btn btn-success mt-2 w-100"
                >
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
