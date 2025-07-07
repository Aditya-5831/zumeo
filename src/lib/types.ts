import { Prisma } from "@prisma/client";
import { ResumeValues } from "./validation";

export interface ResumeEditorProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export const ResumeDataInclude = {
  workExperiences: true,
  educations: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof ResumeDataInclude;
}>;
