"use client";

import { forgetPassword } from "@/lib/auth-client";
import { forgotPasswordSchema, forgotPasswordValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Lock, OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle } from "../ui/alert";
import { Button, buttonVariants } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const [serverError, serServerError] = useState<string | null | undefined>(
    null,
  );

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email }: forgotPasswordValues) =>
      forgetPassword({
        email,
        redirectTo: "/reset-password",
      }),

    onSuccess: (data) => {
      if (data.error) {
        serServerError(data.error.message);
      } else {
        form.reset();
        router.push("/forgot-password/success");
      }
    },
  });

  const onSubmit = (values: forgotPasswordValues) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border">
              <Lock className="text-primary h-16 w-16" strokeWidth={1} />
            </div>
            <span>Trouble logging in?</span>
            <p className="text-muted-foreground text-center text-sm">
              Enter your email and we&apos;ll send you link to get back your
              account
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="Enter your email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <Loader2 className="size-5 animate-spin text-white" />
            ) : (
              "Send reset link"
            )}
          </Button>
          {!!serverError && (
            <Alert className="bg-destructive/10 border-none">
              <OctagonAlertIcon className="!text-destructive h-4 w-4" />
              <AlertTitle>{serverError}</AlertTitle>
            </Alert>
          )}
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <Link
            href={"/sign-up"}
            className={buttonVariants({
              variant: "ghost",
            })}
          >
            Create new account
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
