import { ResumeValues } from "./validation";

export interface ResumeEditorProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}
