"use client";

import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import UserButton from "./UserButton";
import { useSession } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session, isPending } = useSession();

  return (
    <nav className="sticky inset-x-0 top-0 z-[100] h-20 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <MaxWidthWrapper>
        <div className="flex h-full w-full items-center justify-between">
          {/* LOGO */}
          <Link
            href={"/"}
            className="flex items-center gap-2 focus-visible:outline-none"
          >
            <Image src={"/logo.png"} alt="logo" width={40} height={40} />
            <span className="hidden text-lg font-bold md:block">zumeo</span>
          </Link>

          {/* BUTTONS */}
          {isPending ? null : !session ? (
            <div className="flex items-center gap-x-5">
              <Link
                href={"/sign-in"}
                className={buttonVariants({ variant: "ghost" })}
              >
                Sign in
              </Link>
              <div className="h-8 w-px bg-gray-200" />
              <Link
                href={"/sign-up"}
                className={buttonVariants({ variant: "default" })}
              >
                Sign up
              </Link>
            </div>
          ) : (
            <UserButton />
          )}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
