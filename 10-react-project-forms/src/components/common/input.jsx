import React from "react";

const Input = ({ name, label, value, onChange, type }) => {
  return (
    <div className="form-group m-2">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        //   ref={this.username}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="form-control mt-2"
        placeholder="Enter email"
      />
    </div>
  );
};

export default Input;
