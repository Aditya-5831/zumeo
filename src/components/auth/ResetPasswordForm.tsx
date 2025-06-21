"use client";

import { resetPassword } from "@/lib/auth-client";
import { resetPasswordSchema, resetPasswordValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Key, Loader2, OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle } from "../ui/alert";
import { Button, buttonVariants } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const [serverError, setServerError] = useState<string | null | undefined>(
    null,
  );

  console.log(token);

  const router = useRouter();

  const form = useForm<resetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: resetPasswordValues) =>
      resetPassword({
        newPassword: values.confirmPassword,
        token,
      }),

    onSuccess: (data) => {
      if (data.error) {
        setServerError(data.error.message);
      } else {
        form.reset();
        router.push("/reset-password/success");
      }
    },
  });

  const onSubmit = async (values: resetPasswordValues) => {
    setServerError(null);
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border">
              <Key className="text-primary h-10 w-10" strokeWidth={1.3} />
            </div>
            <h1 className="text-2xl font-medium">Reset Password</h1>
            <p className="text-muted-foreground text-[13px] text-balance">
              Enter your new password below to regain access to your account.
              Make sure it&apos;s strong and secure.
            </p>
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!!serverError && (
            <Alert className="bg-destructive/10 border-none">
              <OctagonAlertIcon className="!text-destructive h-4 w-4" />
              <AlertTitle>{serverError}</AlertTitle>
            </Alert>
          )}
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <Loader2 className="size-5 animate-spin text-white" />
            ) : (
              "Reset password"
            )}
          </Button>
          <Link
            href={"/sign-in"}
            className={buttonVariants({
              variant: "ghost",
              className: "flex items-center gap-2 text-sm",
            })}
          >
            <ArrowLeft />
            Back to log in
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
