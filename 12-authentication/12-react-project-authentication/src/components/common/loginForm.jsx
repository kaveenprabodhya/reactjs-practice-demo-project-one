import React from "react";
import Joi from "joi";
import Form from "./form";
import { login } from "../../services/authService";

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
      const { data: jwt } = await login(data.usermail, data.password);
      // console.log(jwt);
      localStorage.setItem("token", jwt);
      // this.props.history.push("/");
      // instead of getting user back to home page we need to do a full restart
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.usermail = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
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
