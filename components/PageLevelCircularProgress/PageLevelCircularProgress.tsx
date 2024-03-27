import { Box, CircularProgress } from "@mui/material";

export const PageLevelCircularProgress = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flex: "1",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
