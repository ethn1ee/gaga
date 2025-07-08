"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks";
import { authClient } from "@/lib/auth";
import { CircleUserIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserAvatar } from "../user";

const UserButton = () => {
  const router = useRouter();
  const { session, isSessionLoading } = useAuth();

  const handleSignOut = async () => {
    await authClient
      .signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully signed out!", {
              position: "top-center",
            });
          },
        },
      })
      .finally(() => router.refresh());
  };

  const handleLogIn = () => {
    if (!session) router.push("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={!session} className="focus:outline-none">
        {session ? (
          <UserAvatar user={session.user} className="size-9" />
        ) : (
          <Button
            variant="secondary"
            disabled={isSessionLoading}
            onClick={handleLogIn}
          >
            {isSessionLoading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <>
                <CircleUserIcon />
                Log In
              </>
            )}
          </Button>
        )}
      </DropdownMenuTrigger>

      {session && (
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/profile" className="size-full">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            My posts
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default UserButton;
