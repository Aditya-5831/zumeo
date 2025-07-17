"use client";

import usePremiumModal from "@/hooks/usePremiumModal";
import { FilePlus2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";

interface CreateResumeButtonProps {
  canCreateResume: boolean;
}

const CreateResumeButton = ({ canCreateResume }: CreateResumeButtonProps) => {
  const { setOpen } = usePremiumModal();

  if (canCreateResume) {
    return (
      <Link href={"/resumes/create"} className={buttonVariants({})}>
        <FilePlus2 />
        Add Resume
      </Link>
    );
  }

  return (
    <Button className="w-fit" onClick={() => setOpen(true)}>
      <FilePlus2 />
      Add Resume
    </Button>
  );
};

export default CreateResumeButton;
