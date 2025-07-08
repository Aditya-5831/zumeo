import { z } from "zod";

// Reusable optional string schema that accepts "" or undefined
const optionalString = z.string().trim().optional().or(z.literal(""));

// Individual form schemas
export const generalInfoFormSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export const personalInfoFormSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less than 4 MB",
    ),
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
  educations: z
    .array(
      z.object({
        degree: optionalString,
        institute: optionalString,
        grade: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});

export const skillsFormSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

// Merged full resume schema
export const resumeSchema = z.object({
  ...generalInfoFormSchema.shape,
  ...personalInfoFormSchema.shape,
  ...workExperienceFormSchema.shape,
  ...educationFormSchema.shape,
  ...skillsFormSchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
});

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters."),
});

// Types
export type GeneralInfoFormValues = z.infer<typeof generalInfoFormSchema>;
export type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;
export type WorkExperienceFormValues = z.infer<typeof workExperienceFormSchema>;
export type EducationFormValues = z.infer<typeof educationFormSchema>;
export type SkillsFormValues = z.infer<typeof skillsFormSchema>;

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};

export type GenerateWorkExperienceInput = z.infer<
  typeof generateWorkExperienceSchema
>;

export type WorkExperience = NonNullable<
  z.infer<typeof workExperienceFormSchema>["workExperiences"]
>[number];
