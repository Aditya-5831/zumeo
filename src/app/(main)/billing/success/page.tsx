import { buttonVariants } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const BillingSuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
      <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
      <h1 className="mb-2 text-3xl font-bold">Payment Successful</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        You’ve successfully upgraded to{" "}
        <span className="font-semibold">Zumeo Premium</span>. Unlock your tools
        and start building stunning resumes.
      </p>

      <Link href={"/resumes"} className={buttonVariants()}>
        Go to Resumes
      </Link>
    </div>
  );
};

export default BillingSuccessPage;
