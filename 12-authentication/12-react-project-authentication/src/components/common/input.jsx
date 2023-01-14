import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group m-2">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        id={name}
        name={name}
        className="form-control mt-2"
        placeholder={"Enter " + label}
      />
      {/* conditional render if only true the other part render otherwise not */}
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Input;
