import { saveResume } from "@/app/(main)/resumes/actions/saveResume";
import { fileReplacer } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "./useDebounce";

export const useAutoSaveResume = (resumeData: ResumeValues) => {
  const searchParams = useSearchParams();
  const debouncedResumeData = useDebounce(resumeData, 1500);

  const [resumeId, setResumeId] = useState(resumeData.id);
  const [lastSavedResumeData, setLastSavedResumeData] = useState(
    structuredClone(resumeData),
  );
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [autoSaveError, setAutoSaveError] = useState(false);

  useEffect(() => {
    setAutoSaveError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    const save = async () => {
      try {
        setIsAutoSaving(true);
        setAutoSaveError(false);

        const newData = structuredClone(debouncedResumeData);

        const updatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSavedResumeData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });

        if (!updatedResume?.id) {
          throw new Error("Resume save failed no ID returned");
        }

        setResumeId(updatedResume.id);
        setLastSavedResumeData(newData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        console.error(error);
        setAutoSaveError(true);
        toast.error("Failed to save resume. Please try again later.");
      } finally {
        setIsAutoSaving(false);
      }
    };

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSavedResumeData, fileReplacer);

    if (
      hasUnsavedChanges &&
      debouncedResumeData &&
      !autoSaveError &&
      !isAutoSaving
    ) {
      save();
    }
  }, [
    debouncedResumeData,
    resumeId,
    lastSavedResumeData,
    isAutoSaving,
    autoSaveError,
    searchParams,
  ]);

  return {
    isAutoSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedResumeData),
  };
};
