import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { addAddress } from "../../api/user";

const AddressForm = ({ handleAddressSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const userId = localStorage.getItem('userId');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    const addressData = {
      ...formData,
      userId,
    };

    await handleUpdateAddress(userId, addressData);
    console.log("Address Details:", addressData);
  };

  const handleUpdateAddress = async (userId, addressData) => {
    try {
      await addAddress(userId, addressData);
      handleAddressSuccess(); // Call the parent function after successful address save
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: 4,
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Shipping Address
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* User Information */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>

          {/* Shipping Information */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Submit Address
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressForm;
