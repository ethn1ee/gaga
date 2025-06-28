"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { getInitials } from "@/lib/utils";
import { CircleUserIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserButton = () => {
  const router = useRouter();
  const { session, isSessionLoading } = useAuth();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Successfully signed out!", {
            position: "top-center",
          });
        },
      },
    });
  };

  const handleLogIn = () => {
    if (!session) router.push("/signin");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {session ? (
          <Avatar className="size-9">
            <AvatarImage src={session.user.image ?? ""} />
            <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
          </Avatar>
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
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            My posts
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default UserButton;
