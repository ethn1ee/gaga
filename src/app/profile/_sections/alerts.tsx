"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { useAuth } from "@/hooks";
import { sendAffiliationVerification } from "@/lib/auth";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const Alerts = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleAffiliationVerification = async () => {
    if (!user?.emoryEmail) return;

    setIsLoading(true);

    const { error } = await sendAffiliationVerification({
      userId: user.id,
      name: user.name,
      emoryEmail: user.emoryEmail,
    });

    if (error) {
      toast.error("Failed to send verification email!", {
        description: "Please try again later",
        position: "top-center",
      });
      console.error(error);
    } else {
      toast.success("Verification Email sent!", {
        description: "Check your Emory email inbox to verify your affiliation",
        position: "top-center",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      {user && !user.emailVerified && (
        <Alert variant="destructive" className="mb-10">
          <AlertCircleIcon />
          <AlertTitle>Verify your email</AlertTitle>
          <AlertDescription>
            You won&apos;t be able to post or comment until you verify your
            associated Emory email.
            <Link href={`/verify-email?email=${user.email}`}>
              <Button size="sm" variant="secondary" className="mt-2">
                Verify Email
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {user?.emoryEmail && !user.emoryEmailVerified && (
        <Alert variant="destructive" className="mb-10">
          <AlertCircleIcon />
          <AlertTitle>Verify your Emory email</AlertTitle>
          <AlertDescription>
            Your affiliation status won&apos;t be visible to others until you
            verify your associated Emory email.
            <LoadingButton
              isLoading={isLoading}
              disabled={isLoading}
              onClick={handleAffiliationVerification}
              size="sm"
              variant="secondary"
              className="mt-2"
            >
              Send Verification Link
            </LoadingButton>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default Alerts;
