import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Loader2
        className="text-primary size-8 animate-spin"
        aria-label="Loading spinner"
        role="status"
      />
      <p className="text-muted-foreground text-sm">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
