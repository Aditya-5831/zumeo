import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return <div className="h-full w-full">{children}</div>;
};

export default MainLayout;
