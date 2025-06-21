import React from "react";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
