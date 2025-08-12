import { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/globals.css"; // if you have global styles

export default function MyApp({ Component, pageProps }: AppProps) {
  // Ensure the client is only created once per browser session
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2, // auto-retry transient errors
        staleTime: 30_000, // 30 seconds
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      {/* Optionally enable React Query Devtools */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}