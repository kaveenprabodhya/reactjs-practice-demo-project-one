import React from "react";
import Joi from "joi";
import Form from "./form";
import { getCurrentUser, login } from "../../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { usermail: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    usermail: Joi.string()
      .email({ tlds: { allow: false } })
      .label("Email"),
    password: Joi.string().min(5).label("Password"),
  });

  doSubmit = async () => {
    const { data } = this.state;
    try {
      await login(data.usermail, data.password);
      // window.location = "/";
      const { state } = this.props.location;
      console.log(state);
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.usermail = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <div className="row">
          <div className="d-flex justify-content-center">
            <form className="col-8 mt-3" onSubmit={this.handleSubmitForm}>
              <div className="form-group">
                {this.renderInput("usermail", "Email", "email")}
              </div>
              <div className="form-group">
                {this.renderInput("password", "Password", "password")}
              </div>
              <div className="m-2">{this.renderButton("Login")}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
