"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks";
import { authClient } from "@/lib/auth";
import { AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";

const MyInformation = () => {
  const { session, isSessionLoading } = useAuth();

  const handleEmailVerification = async () => {
    if (!session) return;

    await authClient
      .sendVerificationEmail({
        email: session.user.email,
        callbackURL: "/",
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        toast.success("Verification email sent!", {
          position: "top-center",
        });
      });
  };

  return (
    <section>
      {!isSessionLoading && !session?.user.emailVerified && (
        <Alert variant="destructive" className="mb-10">
          <AlertCircleIcon />
          <AlertTitle>Verify your email</AlertTitle>
          <AlertDescription>
            You won&apos;t be able to post or comment until you verify your
            associated Emory email.
            <Button onClick={handleEmailVerification} className="mt-2">
              Send Verification Email
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <h2 className="text-lg border-none font-medium">My Information</h2>
      <div className="border p-3 rounded-md">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow className="*:text-muted-foreground">
              <TableHead>Field</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="*:h-12">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{session?.user.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>{session?.user.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>
                {session?.user.email}
                <Badge variant="destructive" className="ml-2 text-xs py-0.5">
                  {session?.user.emailVerified ? "Verified" : "Unverified"}
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default MyInformation;
