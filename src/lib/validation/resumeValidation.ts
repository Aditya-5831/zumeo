import { z } from "zod";

const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoFormSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export const personalInfoFormSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/*")),
      "Must be an image file",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 4 * 4,
      "File must be less than 4 MB",
    )
    .optional(),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export const workExperienceFormSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export const educationFormSchema = z.object({
  education: z.array(
    z.object({
      degree: optionalString,
      institute: optionalString,
      grade: optionalString,
      startDate: optionalString,
      endDate: optionalString,
    }),
  ),
});

export const skillsFormSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

export const resumeSchema = z.object({
  ...generalInfoFormSchema.shape,
  ...personalInfoFormSchema.shape,
  ...workExperienceFormSchema.shape,
  ...educationFormSchema.shape,
  ...skillsFormSchema.shape,
});

export type GeneralInfoFormValues = z.infer<typeof generalInfoFormSchema>;
export type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;
export type WorkExperienceFormValues = z.infer<typeof workExperienceFormSchema>;
export type EductionFormValues = z.infer<typeof educationFormSchema>;
export type SkillsFormValues = z.infer<typeof skillsFormSchema>;
export type ResumeValues = z.infer<typeof resumeSchema>;
