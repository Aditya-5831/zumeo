import SignInForm from "@/components/auth/SignInForm";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const SignIn = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
