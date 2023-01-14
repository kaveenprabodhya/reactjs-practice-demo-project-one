import { Component } from "react";
// import Joi from "joi";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    // const options = { abortEarly: false };
    const { error } = this.schema.validate(
      this.state.data
      /* this.schema,
      options */
    );
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    // console.log(name + " " + value);
    // const schema = { [name]: this.schema[name] };
    const { error } = this.schema.validate(obj);
    // console.log(this.schema.validate(obj));
    return error ? error.details[0].message : null;
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleOnChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-success mt-2 w-100"
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handleOnChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        options={options}
        onChange={this.handleOnChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
