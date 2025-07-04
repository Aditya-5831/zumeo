import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full py-5 md:py-8">
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </div>
  );
};

export default MainLayout;
