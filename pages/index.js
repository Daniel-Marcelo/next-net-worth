import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { BarChartRounded } from "@mui/icons-material";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) router.push("/dashboard");

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flex: '1',
        gap: "2rem",  
      }}
    >
      {["loading", "authenticated"].includes(status) ? (
        <CircularProgress />
      ) : (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Typography variant="h3" sx={{ letterSpacing: ".25rem" }}>
            My Net Worth
          </Typography>
          <Box sx={{textAlign: 'center'}}><BarChartRounded sx={{ fontSize: 96 }} /></Box>
          <Box
            sx={{
              alignSelf: "stretch",
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
            }}
          >
            <Button fullWidth size="large" variant="text">
              Sign Up
            </Button>
            <Button fullWidth size="large" variant="contained" onClick={signIn}>
              Login
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
