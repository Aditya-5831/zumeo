import React from "react";
import { Button } from "../ui/button";
import { Circle, Square, Squircle } from "lucide-react";
import { useUserStore } from "@/hooks/useUserStore";
import usePremiumModal from "@/hooks/usePremiumModal";

export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
};

const borderStyles = Object.values(BorderStyles);

interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

const BorderStyleButton = ({
  borderStyle,
  onChange,
}: BorderStyleButtonProps) => {
  const { isPro } = useUserStore();
  const { setOpen } = usePremiumModal();

  const handleClick = () => {
    if (!isPro) {
      setOpen(true);
      return;
    }

    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  };

  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
        ? Circle
        : Squircle;

  return (
    <Button onClick={handleClick}>
      <Icon className="size-5" />
    </Button>
  );
};

export default BorderStyleButton;
