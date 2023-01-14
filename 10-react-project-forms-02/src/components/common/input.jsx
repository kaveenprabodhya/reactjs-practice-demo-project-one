import React from "react";

const Input = ({ name, label, value, onChange, type, error }) => {
  return (
    <div className="form-group m-2">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="form-control mt-2"
        placeholder="Enter email"
      />
      {/* conditional render if only true the other part render otherwise not */}
      {error && <div className="alert alert-danger mt-1">{error}</div>}
    </div>
  );
};

export default Input;
