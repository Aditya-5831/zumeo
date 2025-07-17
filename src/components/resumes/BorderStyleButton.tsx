import usePremiumModal from "@/hooks/usePremiumModal";
import { useUserStore } from "@/hooks/useUserStore";
import { Circle, Square, Squircle } from "lucide-react";
import { Button } from "../ui/button";

export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
} as const;

const borderStyles = Object.values(BorderStyles);

type BorderStyle = (typeof borderStyles)[number];

interface BorderStyleButtonProps {
  borderStyle: BorderStyle | undefined;
  onChange: (borderStyle: BorderStyle) => void;
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

    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : -1;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  };

  const IconMap = {
    [BorderStyles.SQUARE]: Square,
    [BorderStyles.CIRCLE]: Circle,
    [BorderStyles.SQUIRCLE]: Squircle,
  };

  const Icon = IconMap[borderStyle as keyof typeof IconMap] ?? Square;

  return (
    <Button onClick={handleClick}>
      <Icon className="size-5" />
    </Button>
  );
};

export default BorderStyleButton;
