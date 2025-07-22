"use client";

import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { verifyAffiliation } from "@/lib/auth";
import { parseIdentifier } from "@/lib/utils";
import { api } from "@/trpc/react";
import { GraduationCapIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const VerifyAffiliationPage = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-lg *:w-full">
      <Suspense>
        <Status />
      </Suspense>
    </div>
  );
};

export default VerifyAffiliationPage;

const Status = () => {
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const { data, isLoading } = api.verification.getByIdAndToken.useQuery(
    {
      id: id ?? "",
      token: token ?? "",
    },
    { enabled: !!id && !!token },
  );

  const { id: userId } = parseIdentifier(data?.identifier ?? "");

  const { data: user, isLoading: isUserLoading } = api.user.getById.useQuery(
    userId ?? "",
    { enabled: !!userId },
  );

  const handleVerify = async () => {
    if (!id || !token) return;
    setIsVerifying(true);
    const result = await verifyAffiliation({ id, token });
    setIsVerifying(false);
    setIsVerified(result);
  };

  if (isLoading || isUserLoading) {
    return (
      <Loader2Icon className="animate-spin text-muted-foreground size-8" />
    );
  }

  if (!data || !user) {
    return (
      <>
        <h1 className="text-2xl font-bold text-destructive w-full">
          Link is invalid or expired
        </h1>
        <Link href="/" className="w-full">
          <Button className="w-full">Return to Home</Button>
        </Link>
      </>
    );
  }

  if (isVerified) {
    return (
      <>
        <h1 className="text-2xl font-bold w-full">Verification Successful!</h1>
        <Link href="/" className="w-full">
          <Button className="w-full">Return to Home</Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <h1>Verify Affiliation for {user?.name}</h1>
      <div className="flex gap-3 items-center border rounded-md p-4">
        <div className="bg-muted size-12 rounded-full flex items-center justify-center">
          <GraduationCapIcon size={20} className="text-cyan-600" />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-lg leading-none">
            {user?.affiliation}{" "}
            {(user?.affiliation === "Mom" || user?.affiliation === "Dad") &&
              "of "}
            <span className="text-muted-foreground">({user?.emoryEmail})</span>
          </span>
          {user?.class && (
            <span className="text-sm text-muted-foreground leading-none">
              Class of {user.class}
            </span>
          )}
        </div>
      </div>

      <LoadingButton isLoading={isVerifying} onClick={handleVerify}>
        Confirm
      </LoadingButton>
    </>
  );
};
