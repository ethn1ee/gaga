"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";

const Alerts = () => {
  const { user } = useAuth();

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
                Verify email
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {user && !user.emoryEmailVerified && (
        <Alert variant="destructive" className="mb-10">
          <AlertCircleIcon />
          <AlertTitle>Verify your Emory email</AlertTitle>
          <AlertDescription>
            Your affiliation status won&apos;t be verified until you verify your
            associated Emory email.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default Alerts;
