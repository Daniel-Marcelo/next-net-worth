import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../styles/global.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

import { FixedBottomNavigation } from "../components/BottomNav/BottomNav";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [a, setA] = useState<any>(new Set());
  useEffect(() => {
    const messageListener = window.addEventListener(
      "message",
      (nativeEvent) => {
        console.log(nativeEvent?.data);
        if (nativeEvent.source) {
          setA(new Set([...a, nativeEvent.data.source]));
        }
      }
    );
    return messageListener;
  }, []);

  // method to send msg to react native
  const sendMessage = () => {
    (window as any)?.ReactNativeWebView.postMessage("Hi from PWA");
  };
  // Instead do this, which ensures each request has its own cache:
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <SessionProvider session={session}>
      <button onClick={sendMessage}>{` Say Hi`}</button>
      {Array.from(a).map((source) => (
        <div>{source as any}</div>
      ))}
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
            <FixedBottomNavigation />
          </ThemeProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </SessionProvider>
  );
}
