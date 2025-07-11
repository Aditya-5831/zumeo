import React from "react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { steps } from "./steps";

interface ResumeEditorFooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  isAutoSaving: boolean;
}

const ResumeEditorFooter = ({
  isAutoSaving,
  currentStep,
  setCurrentStep,
}: ResumeEditorFooterProps) => {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          disabled={!previousStep}
          onClick={
            previousStep ? () => setCurrentStep(previousStep) : undefined
          }
          variant={"secondary"}
        >
          Previous
        </Button>
        <Button
          disabled={!nextStep}
          onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
        >
          Next
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href={"/resumes"}
          className={buttonVariants({ variant: "secondary" })}
        >
          Close
        </Link>
      </div>
      {isAutoSaving && <p className="text-muted-foreground">Saving...</p>}
    </div>
  );
};

export default ResumeEditorFooter;
