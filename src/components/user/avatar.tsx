import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserAvatarWithTimeProps = {
  id: string;
  time: string;
  size?: "default" | "small";
};

const UserAvatarWithTime = (props: UserAvatarWithTimeProps) => {
  const { id, time, size } = props;

  switch (size) {
    case "small":
      return (
        <div className="flex flex-row items-center gap-2">
          <Avatar className="size-6">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="space-x-2">
            <span className="font-medium">{id}</span>
            <span className="text-muted-foreground text-sm">{time}</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex flex-row items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <span className="block font-medium">{id}</span>
            <span className="block text-sm text-muted-foreground">{time}</span>
          </div>
        </div>
      );
  }
};

export { UserAvatarWithTime };
