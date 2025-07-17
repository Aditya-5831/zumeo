"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { toast } from "sonner";
import { createCheckoutSession } from "@/app/(main)/billing/actions/createCheckoutSession";
import { useMutation } from "@tanstack/react-query";

const premiumFeatures = [
  "AI Tools",
  "Infinite resumes",
  "Design customizations",
];

const PremiumModal = () => {
  const { open, setOpen } = usePremiumModal();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const redirectUrl = await createCheckoutSession();
        window.location.href = redirectUrl;
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const handleClick = async () => {
    mutate();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!isPending) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader className="flex flex-col items-center">
          <Image
            src={"/logo.png"}
            width={50}
            height={50}
            alt="logo"
            className="mb-5"
          />
          <DialogTitle className="text-center text-2xl font-bold">
            Upgrade to Zumeo Premium
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center text-sm">
            Unlock AI-powered resume tools for faster job success.
          </DialogDescription>
        </DialogHeader>

        <ul className="divide-muted divide-y">
          {premiumFeatures.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 py-3">
              <div className="bg-primary flex items-center justify-center p-0.5">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          disabled={isPending}
          className="mt-6 w-full"
          onClick={handleClick}
        >
          {isPending ? (
            <Loader2 className="size-5 animate-spin text-white" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
