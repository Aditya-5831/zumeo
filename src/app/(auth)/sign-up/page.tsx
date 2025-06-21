import SignUpForm from "@/components/auth/SignUpForm";
import { Card, CardContent } from "@/components/ui/card";

const SignUp = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
