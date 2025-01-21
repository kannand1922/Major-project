import React, { useState } from "react";
import { Button, Box, Typography, Alert, TextField } from "@mui/material";
import AuthService from "../../api/auth/auth.service";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.signup(formData);
      console.log("Signup Successful:", response);
      if (response.token) {
        localStorage.setItem("token", response.token);
      } 
      router.push("/login"); // Redirect on success
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(to right, #7b4397, #dc2430)",
        padding: "16px",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "500px",
          padding: "24px",
          minHeight: "500px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h5"
          mb={2}
          align="center"
          sx={{ fontWeight: "bold", color: "#333", marginTop: "60px" }}
        >
          Signup
        </Typography>
        {error && (
          <Alert severity="error" sx={{ marginBottom: "16px" }}>
            {error}
          </Alert>
        )}
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          sx={{
            marginBottom: "16px",
            "& .MuiInputBase-root": {
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#d9d9d9",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7b4397",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#dc2430",
            },
          }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          fullWidth
          sx={{
            marginBottom: "16px",
            "& .MuiInputBase-root": {
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#d9d9d9",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7b4397",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#dc2430",
            },
          }}
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          fullWidth
          sx={{
            marginBottom: "24px",
            "& .MuiInputBase-root": {
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#d9d9d9",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7b4397",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#dc2430",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          sx={{
            fontWeight: "bold",
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "#28a745",
            "&:hover": {
              backgroundColor: "#218838",
            },
          }}
        >
          Signup
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => router.push("/login")} // Navigate to login page
          sx={{
            marginTop: "16px",
            fontWeight: "bold",
            padding: "12px",
            borderRadius: "8px",
            borderColor: "#007bff",
            color: "#007bff",
            "&:hover": {
              borderColor: "#0056b3",
              color: "#0056b3",
            },
          }}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
