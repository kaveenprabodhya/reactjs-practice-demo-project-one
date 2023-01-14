import Joi from "joi-browser";
import React from "react";
import Form from "./form";

class RegisterForm extends Form {
  state = {
    data: {
      usermail: "",
      password: "",
      username: "",
    },
    errors: {},
  };

  schema = Joi.object({
    usermail: Joi.string().email().label("Email"),
    password: Joi.string().min(5).label("Password"),
    username: Joi.string().label("Name"),
  });

  doSubmit = () => {
    console.log("Register Submitted");
  };

  render() {
    return (
      <div>
        <h1>SignUp</h1>
        <div className="row">
          <div className="d-flex justify-content-center">
            <form className="col-8 mt-3" onSubmit={this.handleSubmitForm}>
              <div className="form-group">
                {this.renderInput("usermail", "Email", "email")}
              </div>
              <div className="form-group">
                {this.renderInput("password", "Password", "password")}
              </div>
              <div className="form-group">
                {this.renderInput("username", "Username", "text")}
              </div>
              <div className="m-2">{this.renderButton("Sign Up")}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
