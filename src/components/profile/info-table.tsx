"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { user as userSchema } from "@/lib/schema/user";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type User } from "@prisma/client";
import { Loader2Icon, PencilIcon } from "lucide-react";
import {
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod/v4";
import { Form } from "../ui/form";

type InfoTableProps = {
  title: string;
  fields: { title: string; field: string; editable?: boolean }[];
  editFormFields: ReactNode;
};

const InfoTable = (props: InfoTableProps) => {
  const [open, setOpen] = useState(false);
  const { user, isSessionLoading } = useAuth();

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-lg border-none font-medium">{props.title}</h2>
        <Dialog open={open}>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setOpen(true)}
            className="text-muted-foreground"
          >
            <PencilIcon />
            Edit
          </Button>

          <EditDialog {...props} setOpen={setOpen} />
        </Dialog>
      </div>

      <div className="border p-3 rounded-md">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow className="*:text-muted-foreground">
              <TableHead>Field</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="*:h-12">
            {props.fields.map(({ title, field }) => (
              <TableRow key={field}>
                <TableCell>{title}</TableCell>
                <TableCell>
                  {isSessionLoading || !user ? (
                    <Skeleton className="w-20 h-5" />
                  ) : (
                    (user[field as keyof User]?.toString() ?? (
                      <span className="text-muted-foreground">Not set</span>
                    ))
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default InfoTable;

type EditDialogProps = Pick<
  InfoTableProps,
  "editFormFields" | "fields" | "title"
> & {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const EditDialog = ({
  editFormFields: formFields,
  setOpen,
  fields,
  title,
}: EditDialogProps) => {
  const { user, refresh } = useAuth();

  const schemaMask = fields.reduce<Record<string, boolean>>((acc, item) => {
    if (item.editable) acc[item.field] = true;
    return acc;
  }, {});

  const formSchema = userSchema
    .omit({ password: true })
    .pick(schemaMask as Record<string, never>)
    .refine(
      ({ emoryEmail, affiliation }) => {
        if (!affiliation) return true;

        if (affiliation !== "None") {
          return !!emoryEmail;
        }
        return true;
      },
      { message: "Emory email is required", path: ["emoryEmail"] },
    );

  type EditForm = z.infer<typeof formSchema>;

  const form = useForm({
    resolver: zodResolver(formSchema),
    values: {
      ...user,
      name: user?.name ?? "",
      email: user?.email ?? "",
      affiliation: user?.affiliation as z.infer<
        typeof formSchema.shape.affiliation
      >,
    },
    mode: "onChange",
  });

  const updateUser = api.user.update.useMutation({
    onSuccess: async () => {
      toast.success("Affiliation updated successfully!", {
        position: "top-center",
      });
      refresh();
      setOpen(false);
    },
  });

  const handleSubmit = async (values: EditForm) => {
    if (!user) return;
    await updateUser.mutateAsync({ email: user.email, data: values });
  };

  return (
    <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Update {title}</DialogTitle>
            <DialogDescription className="sr-only">
              Update information
            </DialogDescription>
          </DialogHeader>
          {formFields}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                !formSchema.safeParse(form.watch()).success ||
                form.formState.isSubmitting ||
                !form.formState.isDirty
              }
            >
              {form.formState.isSubmitting ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
