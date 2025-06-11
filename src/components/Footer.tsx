import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex h-20 w-full items-center border-t border-gray-200">
      <MaxWidthWrapper>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between sm:gap-0">
          <span className="text-muted-foreground text-sm">
            &copy;{new Date().getFullYear()}
          </span>
          <div className="flex items-center gap-4 sm:gap-8">
            <Link
              href={"/terms"}
              className="text-muted-foreground hover:text-primary text-sm focus:outline-none"
            >
              Terms
            </Link>
            <Link
              href={"/privacy-policy"}
              className="text-muted-foreground hover:text-primary text-sm focus:outline-none"
            >
              Privacy Policy
            </Link>
            <Link
              href={"/cookie-policy"}
              className="text-muted-foreground hover:text-primary text-sm focus:outline-none"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;
