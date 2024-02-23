import { Box, Button, Typography } from "@mui/material";
import { withProtected } from "../../components/RouteProtection";
import { useLogout } from "../../hooks/useAuth";

export function Page() {
  const logout = useLogout();
  return (
    <Box sx={{ p: "2rem" }}>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Manage Your Account
      </Typography>
      <Button
        variant="contained"
        onClick={() => logout.mutate()}
        fullWidth
        sx={{ mt: "2rem" }}
      >
        Logout
      </Button>
    </Box>
  );
}
export default withProtected(Page);
