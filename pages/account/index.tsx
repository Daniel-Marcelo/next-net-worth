import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export function Page() {
  return (
    <Box sx={{ p: "2rem" }}>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Manage Your Account
      </Typography>
      <Button
        variant="contained"
        onClick={() => signOut()}
        fullWidth
        sx={{ mt: "2rem" }}
      >
        Logout
      </Button>
    </Box>
  );
}
export default Page;
