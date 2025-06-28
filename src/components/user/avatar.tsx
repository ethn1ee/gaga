import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { type User } from "@prisma/client";

type UserAvatarWithTimeProps = {
  user: User;
  time: string;
  size?: "default" | "sm";
};

const UserAvatarWithTime = ({ user, time, size }: UserAvatarWithTimeProps) => {
  const initials = getInitials(user.name);
  const avatar = user.image ?? "";

  switch (size) {
    case "sm":
      return (
        <div className="flex flex-row items-center gap-2">
          <Avatar className="size-6">
            <AvatarImage src={avatar} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>

          <div className="space-x-2">
            <span className="font-medium">{user.username}</span>
            <span className="text-muted-foreground text-sm">{time}</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex flex-row items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage src={avatar} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div>
            <span className="block font-medium">{user.username}</span>
            <span className="block text-sm text-muted-foreground">{time}</span>
          </div>
        </div>
      );
  }
};

export { UserAvatarWithTime };
