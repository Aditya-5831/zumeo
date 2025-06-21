import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

const ResetPassword = async ({ searchParams }: PageProps) => {
  const token = (await searchParams).token;

  if (!token) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-full w-full flex-col">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <ResetPasswordForm token={token} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
