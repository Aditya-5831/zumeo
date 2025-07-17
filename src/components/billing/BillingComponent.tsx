"use client";

import { createCheckoutSession } from "@/app/(main)/billing/actions/createCheckoutSession";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/hooks/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const BillingComponent = () => {
  const { isPro } = useUserStore();

  const { mutate: upgradeToPro, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const redirectUrl = await createCheckoutSession();
        window.location.href = redirectUrl;
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="mx-auto mt-10 max-w-2xl space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Manage your subscription and billing information.
        </p>
      </div>

      {/* Plan Card */}
      <div className="bg-background space-y-6 rounded-2xl border p-6 shadow-md sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Current Plan</h2>
            <p className="text-muted-foreground text-sm">
              {isPro
                ? "You’re subscribed to the Pro plan."
                : "You’re on the Free plan."}
            </p>
          </div>
          <Badge variant={isPro ? "default" : "outline"}>
            {isPro ? "Pro" : "Free"}
          </Badge>
        </div>

        <Separator />

        {/* Pro Plan Benefits */}
        <div>
          <h3 className="text-base font-medium">Pro Plan Benefits</h3>
          <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-500" />
              Unlimited resumes
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-500" />
              AI-powered resume generation
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-500" />
              Priority support
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-500" />
              Access to premium templates
            </li>
          </ul>
        </div>

        {/* Button Area */}
        <div className="pt-4">
          {isPro ? (
            <Button className="w-full" asChild>
              <Link href="/resumes">Go to Resumes</Link>
            </Button>
          ) : (
            <Button
              className="w-full"
              disabled={isPending}
              onClick={() => upgradeToPro()}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" />
                  Redirecting to payment...
                </>
              ) : (
                "Upgrade to Pro"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingComponent;
