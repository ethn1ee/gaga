import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { type User } from "@prisma/client";

type UserAvatarProps = {
  user: User;
  className?: React.ComponentProps<typeof Avatar>["className"];
};

const UserAvatar = ({ user, className }: UserAvatarProps) => {
  const initials = getInitials(user.name);
  const avatar = user.image ?? "";

  return (
    <Avatar className={className}>
      <AvatarImage src={avatar} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

type UserAvatarWithTimeProps = UserAvatarProps & {
  size?: "default" | "sm";
  time: string;
};

const UserAvatarWithDetail = ({
  user,
  time: detail,
  size,
}: UserAvatarWithTimeProps) => {
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
          {user.name}
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
