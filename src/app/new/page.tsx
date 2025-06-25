import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Form from "./_form";

const New = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <main>
      <Suspense>
        <Form />
      </Suspense>
    </main>
  );
};

export default New;
