"use client";

import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Actions from "./actions";
import MyInformation from "./my-information";
import MyPosts from "./my-posts";
import Summary from "./summary";

const Profile = () => {
  const { session, isSessionLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSessionLoading && !session) {
      router.push("/signin");
    }
  }, [isSessionLoading, session, router]);

  return (
    <main className="space-y-10">
      <Summary />
      <MyInformation />
      <MyPosts />
      <Actions />
    </main>
  );
};

export default Profile;
