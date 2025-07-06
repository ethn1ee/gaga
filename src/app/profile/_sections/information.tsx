"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import { AlertCircleIcon, CheckIcon } from "lucide-react";
import { toast } from "sonner";

const Information = () => {
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
          description: session.user.email,
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
            <Button
              onClick={handleEmailVerification}
              size="sm"
              variant="secondary"
              className="mt-2"
            >
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
              <TableCell>
                {session?.user.name ?? <Skeleton className="w-20 h-5" />}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>
                {session?.user.username ?? <Skeleton className="w-20 h-5" />}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>
                {session?.user.email ?? <Skeleton className="w-20 h-5" />}
                {!isSessionLoading &&
                  (session?.user.emailVerified ? (
                    <Badge className="ml-2 p-0.5 rounded-full relative top-0.5 bg-cyan-600">
                      <CheckIcon />
                    </Badge>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="ml-2 text-xs py-0.5"
                    >
                      Unverified
                    </Badge>
                  ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default Information;
