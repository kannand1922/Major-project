import React from "react";
import { TextField } from "@mui/material";

const FormInput = ({ label, value, onChange, name, type = "text" }) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
      name={name}
      type={type}
      fullWidth
      margin="normal"
    />
  );
};

export default FormInput;
