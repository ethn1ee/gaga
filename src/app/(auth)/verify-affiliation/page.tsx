"use client";

import { Button } from "@/components/ui/button";
import { verifyAffiliation } from "@/lib/auth";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyAffiliationPage = () => {
  const searchParams = useSearchParams();

  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verify = async () => {
      const id = searchParams.get("id");
      const token = searchParams.get("token");

      setIsVerified(
        id && token ? await verifyAffiliation({ id, token }) : false,
      );

      if (!id || !token) {
        setError("Link is invalid or has expired");
      }
      setIsVerifying(false);
    };

    void verify();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      {isVerifying ? (
        <Loader2Icon className="animate-spin text-muted-foreground size-8" />
      ) : isVerified ? (
        <>
          <h1 className="text-2xl font-bold w-full">
            Verification Successful!
          </h1>
          <Link href="/" className="w-full">
            <Button className="w-full">Return to Home</Button>
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-destructive w-full">
            Verification Failed
          </h1>
          <p className="text-muted-foreground w-full">{error}</p>
          <Link href="/" className="w-full">
            <Button className="w-full">Return to Home</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default VerifyAffiliationPage;
