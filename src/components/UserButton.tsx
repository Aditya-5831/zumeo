"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Crown, FileText, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";

const UserButton = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const logout = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (!session) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="flex items-center gap-2 rounded-full focus-visible:ring-0 focus-visible:outline-none"
        >
          <UserAvatar
            seed={session.user.name}
            variant="initials"
            className="size-9"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border- z-[99999] w-60 rounded-xl p-2 shadow-lg"
        align="end"
      >
        <DropdownMenuLabel className="text-sm font-medium">
          Logged in as{" "}
          <span className="truncate font-semibold">{session.user.name}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push("/resumes")}>
          <FileText className="mr-2 size-4" />
          Resumes
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push("/billing")}>
          <Crown className="mr-2 size-4 text-yellow-500" />
          Upgrade to Pro
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout} className="text-destructive">
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
