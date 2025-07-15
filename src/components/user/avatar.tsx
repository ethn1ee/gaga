import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { type User } from "@prisma/client";
import { GraduationCapIcon, Loader2Icon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

type UserAvatarProps = {
  user?: Partial<User>;
  isLoading?: boolean;
  className?: React.ComponentProps<typeof Avatar>["className"];
};

const UserAvatar = ({ user, className, isLoading }: UserAvatarProps) => {
  const initials = getInitials(user?.name ?? "");
  const avatar = user?.image ?? undefined;

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
    <div data-size={size} className="group flex flex-row items-center gap-2">
      <UserAvatar
        user={user}
        className="group-data-[size=default]:size-9 group-data-[size=sm]:size-6"
      />
      <div>
        <span className="font-medium mr-2 inline-flex gap-1 items-center">
          {user?.name}
          {user?.emoryEmailVerified && (
            <HoverCard>
              <HoverCardTrigger className="font-light size-5 p-0 cursor-pointer bg-muted rounded-full flex items-center justify-center hover:opacity-60 animate">
                <GraduationCapIcon size={12} className="text-cyan-600" />
              </HoverCardTrigger>
              <HoverCardContent className="flex gap-2 items-center">
                <div className="bg-muted size-12 rounded-full flex items-center justify-center">
                  <GraduationCapIcon size={20} className="text-cyan-600" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-base leading-none">
                    {user.affiliation}
                  </span>
                  {user.class && (
                    <span className="text-xs text-muted-foreground leading-none">
                      Class of {user.class}
                    </span>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
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
