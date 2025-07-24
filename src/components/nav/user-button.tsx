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
import { IconBrandGithub } from "@tabler/icons-react";
import {
  CircleUserIcon,
  FlaskConicalIcon,
  LogOutIcon,
  TablePropertiesIcon,
  UserIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingButton } from "../ui/loading-button";
import { UserAvatar } from "../user";

const UserButton = () => {
  const t = useTranslations("user-button");
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
            {t("button")}
          </LoadingButton>
        )}
      </DropdownMenuTrigger>

      {session && (
        <DropdownMenuContent className="w-50 mr-2">
          <DropdownMenuLabel>{t("my-account.title")}</DropdownMenuLabel>

          <DropdownMenuGroup>
            <Link href="/profile">
              <DropdownMenuItem>
                <UserIcon />
                {t("my-account.items.profile")}
              </DropdownMenuItem>
            </Link>
            <Link href="/profile/posts">
              <DropdownMenuItem>
                <TablePropertiesIcon />
                {t("my-account.items.my-posts")}
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuLabel>{t("website.title")}</DropdownMenuLabel>

          <DropdownMenuGroup>
            <Link href="/feature-requests">
              <DropdownMenuItem>
                <FlaskConicalIcon />
                {t("website.items.request-features")}
              </DropdownMenuItem>
            </Link>
            <Link href="https://github.com/ethn1ee/emorylife">
              <DropdownMenuItem>
                <IconBrandGithub />
                {t("website.items.visit-github")}
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOutIcon />
              {t("sign-out")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default UserButton;
