import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

const ForgotPasswordSuccess = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="flex flex-col items-center justify-center p-6 md:p-8 md:px-14">
            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full border">
              <Mail className="text-primary h-10 w-10" strokeWidth={1.3} />
            </div>
            <h1 className="text-[22px] font-medium">Check your email</h1>
            <p className="text-muted-foreground text-[13px]">
              We sent password reset link to johnDoe@example.com
            </p>
            <Link
              href="https://mail.google.com/mail/u/0/#inbox"
              className={buttonVariants({ className: "my-5 w-full" })}
            >
              Open email app
            </Link>
            <div className="text-muted-foreground text-[13px]">
              Don&apos;t receive the email?{" "}
              <span className="text-primary cursor-pointer hover:underline">
                Click to resend
              </span>
            </div>
            <Link
              href={"/sign-in"}
              className={buttonVariants({
                variant: "ghost",
                className: "mt-3 flex w-full items-center gap-2",
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

export default ForgotPasswordSuccess;
