"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { signUpSchema, signUpValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { Alert, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const SignUpForm = () => {
  const [serverError, setServerError] = useState<string | null | undefined>(
    null,
  );
  const router = useRouter();

  const form = useForm<signUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: signUpValues) =>
      signUp.email({
        email: values.email,
        name: values.name,
        password: values.password,
      }),
    onSuccess: (data) => {
      if (data.error) {
        setServerError(data.error.message);
      } else {
        form.reset();
        toast.success("Account created successfully!");
        router.push("/resumes");
      }
    },
  });

  const onSubmit = async ({ email, name, password }: signUpValues) => {
    setServerError(null);
    mutate({ email, name, password });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">
              Create your resume smarter 🚀
            </h1>
            <p className="text-muted-foreground text-[13px] text-balance">
              Sign up for Zumeo and start building your <br /> AI-powered resume
              in minutes.
            </p>
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="john Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="**********"
                    />
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
              "Sign up"
            )}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <Button
            variant="outline"
            className="flex w-full items-center gap-2"
            type="button"
            onClick={() =>
              signIn.social({
                provider: "google",
                callbackURL: "/resumes",
              })
            }
          >
            <FcGoogle className="size-[18px]" />
            Continue with Google
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href={"sign-in"} className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
