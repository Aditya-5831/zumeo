"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
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
      <DropdownMenuTrigger>
        <UserAvatar
          seed={session.user.name}
          variant="initials"
          className="mr-3 size-9 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[99999] p-2">
        <DropdownMenuLabel>Logged in as {session.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-destructive">
          <LogOutIcon className="text-destructive mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
