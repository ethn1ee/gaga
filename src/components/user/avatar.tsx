import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

type UserAvatarProps = {
  user?: {
    name?: string | null;
    image?: string | null;
  };
  isLoading?: boolean;
  className?: React.ComponentProps<typeof Avatar>["className"];
};

const UserAvatar = ({ user, className, isLoading }: UserAvatarProps) => {
  const initials = getInitials(user?.name ?? "");
  const avatar = user?.image ?? null;

  return (
    <div
      className={cn(
        "bg-muted flex items-center justify-center rounded-full overflow-hidden size-9",
        className,
      )}
    >
      {isLoading ? (
        <Loader2Icon className="text-muted-foreground animate-spin" />
      ) : (
        <Avatar className="size-full">
          <AvatarImage src={avatar} className="object-cover" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

type UserAvatarWithDetailProps = UserAvatarProps & {
  size: "default" | "sm";
  time: string;
};

const UserAvatarWithDetail = ({
  user,
  time: detail,
  size,
}: UserAvatarWithDetailProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <UserAvatar
        user={user}
        className={cn(
          size === "sm" ? "size-6" : size === "default" ? "size-9" : "",
        )}
      />

      <div>
        <span className={cn("font-medium mr-2", size === "default" && "block")}>
          {user?.name}
        </span>
        <span
          className={cn(
            "text-muted-foreground text-sm",
            size === "default" && "block",
          )}
        >
          {detail}
        </span>
      </div>
    </div>
  );
};

export { UserAvatar, UserAvatarWithDetail };
