import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { steps } from "./steps";

interface BreadcrumbsProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

const Breadcrumbs = ({ currentStep, setCurrentStep }: BreadcrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {steps.map((step) => (
          <Fragment key={step.key}>
            <BreadcrumbItem>
              {step.key === currentStep ? (
                <BreadcrumbPage>{step.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <button onClick={() => setCurrentStep(step.key)}>
                    {step.title}
                  </button>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator className="last:hidden" />
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
