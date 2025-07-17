import { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { PaletteIcon } from "lucide-react";
import { useUserStore } from "@/hooks/useUserStore";
import usePremiumModal from "@/hooks/usePremiumModal";

interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [showPopOver, setShowPopOver] = useState(false);

  const { isPro } = useUserStore();
  const { setOpen } = usePremiumModal();

  const handleClick = () => {
    if (!isPro) {
      setOpen(true);
      return;
    }
    setShowPopOver(true);
  };

  return (
    <Popover open={showPopOver} onOpenChange={setShowPopOver}>
      <PopoverTrigger asChild>
        <Button onClick={handleClick}>
          <PaletteIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="end"
      >
        <TwitterPicker color={color} onChange={onChange} triangle="top-right" />
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
