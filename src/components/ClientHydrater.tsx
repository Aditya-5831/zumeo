"use client";

import { useUserStore } from "@/hooks/useUserStore";
import { useEffect } from "react";

interface ClientHydrater {
  isPro: boolean;
}

const ClientHydrater = ({ isPro }: ClientHydrater) => {
  const { setIsPro } = useUserStore();

  useEffect(() => {
    setIsPro(isPro);
  }, [isPro, setIsPro]);

  return null;
};

export default ClientHydrater;
