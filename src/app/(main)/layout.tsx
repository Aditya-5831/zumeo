import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full py-8">
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </div>
  );
};

export default MainLayout;
