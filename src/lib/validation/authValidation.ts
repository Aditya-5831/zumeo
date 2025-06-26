import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, { message: "username is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters long" }),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be 8 characters long" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type signInValues = z.infer<typeof signInSchema>;
export type signUpValues = z.infer<typeof signUpSchema>;
export type forgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type resetPasswordValues = z.infer<typeof resetPasswordSchema>;
