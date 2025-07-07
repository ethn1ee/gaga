"use client";

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
import { api } from "@/trpc/react";

const EmoryAffiliation = () => {
  const { session } = useAuth();

  const { data, isLoading } = api.user.getByUsername.useQuery(
    session?.user.username ?? "",
    {
      enabled: !!session?.user.username,
    },
  );

  if (data?.affiliation === "None") {
    return null;
  }

  return (
    <section>
      <h2 className="text-lg border-none font-medium">Emory Affiliation</h2>
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
              <TableCell>Affiliation</TableCell>
              <TableCell>
                {data?.affiliation ?? <Skeleton className="w-20 h-5" />}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Class</TableCell>
              <TableCell>
                {isLoading ? (
                  <Skeleton className="w-20 h-5" />
                ) : (
                  (data?.class ?? (
                    <span className="text-muted-foreground">Not set</span>
                  ))
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default EmoryAffiliation;
