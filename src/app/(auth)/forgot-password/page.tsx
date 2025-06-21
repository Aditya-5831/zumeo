import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
