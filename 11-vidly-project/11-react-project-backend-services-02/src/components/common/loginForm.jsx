import React from "react";
import Joi from "joi";
import Form from "./form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().label("Username"),
    password: Joi.string().label("Password"),
  });

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="row">
          <div className="d-flex justify-content-center">
            <form className="col-8 mt-3" onSubmit={this.handleSubmitForm}>
              {this.renderInput("username", "Username", "text")}
              {this.renderInput("password", "Password", "password")}
              <div className="m-2">{this.renderButton("Login")}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
