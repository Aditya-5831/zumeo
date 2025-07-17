import BillingComponent from "@/components/billing/BillingComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Billing",
};

const BillingPage = () => {
  return <BillingComponent />;
};

export default BillingPage;
