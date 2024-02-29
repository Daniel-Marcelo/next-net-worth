import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export function Page() {
  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => axios.post("api/logout"),
  });
  return (
    <Box sx={{ p: "2rem" }}>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Manage Your Account
      </Typography>
      <Button
        variant="contained"
        onClick={() => mutation.mutate()}
        fullWidth
        sx={{ mt: "2rem" }}
      >
        Logout
      </Button>
    </Box>
  );
}
export default Page;
