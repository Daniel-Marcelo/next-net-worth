import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/AuthContext";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../styles/global.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

import { FixedBottomNavigation } from "../components/BottomNav/BottomNav";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();
export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [value, setValue] = useState(0);
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {/* <DrawerAppBar /> */}
            <Component {...pageProps} />
            <FixedBottomNavigation />
          </ThemeProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </SessionProvider>
  );
}
