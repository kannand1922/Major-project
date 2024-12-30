import React, { useState } from "react";
import { Button, Box, Typography, Alert } from "@mui/material";
import FormInput from "../../components/formInput";
import AuthService from "../../api/auth/auth.service";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(formData);
      console.log("Login Successful:", response);
      router.push("/category"); // Redirect on success
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: 400, padding: 4, boxShadow: 3, bgcolor: "white", borderRadius: 2 }}
      >
        <Typography variant="h5" mb={2} align="center">
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <FormInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
        />
        <FormInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
