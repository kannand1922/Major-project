"use client";

import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { useAlert } from "../context/alert";

const Alert = () => {
  const { alert } = useAlert();

  if (!alert) return null;

  return (
    <Snackbar open={true} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <MuiAlert severity={alert.severity} variant="filled" sx={{ width: "100%" }}>
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
