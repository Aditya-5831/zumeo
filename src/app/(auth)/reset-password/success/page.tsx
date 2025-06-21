import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CircleCheckBig } from "lucide-react";
import Link from "next/link";

const PasswordResetSuccess = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="flex flex-col items-center justify-center p-6 md:p-8 md:px-14">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border">
              <CircleCheckBig
                className="h-10 w-10 text-green-500"
                strokeWidth={1.3}
              />
            </div>
            <h1 className="text-[22px] font-medium">Password reset</h1>
            <p className="text-muted-foreground text-[13px]">
              Your password has been successfully reset
            </p>
            <Link
              href={"/sign-in"}
              className={buttonVariants({
                className: "my-5 w-full",
                size: "sm",
              })}
            >
              Continue
            </Link>
            <Link
              href={"/sign-in"}
              className={buttonVariants({
                variant: "ghost",
                className: "flex w-full items-center gap-2",
              })}
            >
              <ArrowLeft />
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordResetSuccess;
