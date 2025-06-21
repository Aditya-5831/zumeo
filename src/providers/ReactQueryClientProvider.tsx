"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useRef } from "react";

const ReactQueryClientProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useRef<QueryClient | null>(null);

  if (!queryClient.current) {
    queryClient.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClient.current}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
