import ClientHydrater from "@/components/ClientHydrater";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PremiumModal from "@/components/billing/PremiumModal";
import { extendedAuth } from "@/lib/extended-auth";
import React, { ReactNode } from "react";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const session = await extendedAuth.getSession();

  if (!session.user) {
    return null;
  }

  const isPro = session.user.isPro ?? false;

  return (
    <div className="h-full w-full py-5 md:py-8">
      <MaxWidthWrapper>
        <ClientHydrater isPro={isPro} />
        {children}
        <PremiumModal />
      </MaxWidthWrapper>
    </div>
  );
};

export default MainLayout;
