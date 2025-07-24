"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks";
import { authClient } from "@/lib/auth";
import { CircleUserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingButton } from "../ui/loading-button";
import { UserAvatar } from "../user";

const UserButton = () => {
  const t = useTranslations("misc");
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

  const handleSignIn = async () => {
    if (!session) router.push("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={!session} className="focus:outline-none">
        {session ? (
          <UserAvatar user={session.user} className="size-9" />
        ) : (
          <LoadingButton
            isLoading={isSessionLoading}
            disabled={isSessionLoading}
            onClick={handleSignIn}
          >
            <CircleUserIcon className="text-muted" />
            {t("sign-in")}
          </LoadingButton>
        )}
      </DropdownMenuTrigger>

      {session && (
        <DropdownMenuContent className="**:cursor-pointer">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuGroup>
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/profile/posts">
              <DropdownMenuItem className="cursor-pointer">
                My posts
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default UserButton;
