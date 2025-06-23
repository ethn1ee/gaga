"use client";

import { useAuth } from "@/hooks";
import { CircleUserIcon, Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";

const UserButton = () => {
  const { session, isSessionLoading } = useAuth({ protect: false });

  return (
    <Button variant="outline" disabled={isSessionLoading}>
      {isSessionLoading ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <>
          <CircleUserIcon />
          {session ? session.user.username : "Log In"}
        </>
      )}
    </Button>
  );
};

export default UserButton;
