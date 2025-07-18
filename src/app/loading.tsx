import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
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
