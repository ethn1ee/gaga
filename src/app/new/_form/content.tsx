import FlexibleTextarea from "@/components/flexible-textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type PostInput } from "@/lib/schema";
import { useFormContext } from "react-hook-form";

const ContentInput = () => {
  const form = useFormContext<PostInput>();

  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">Content</FormLabel>
          <FormControl>
            <FlexibleTextarea
              {...field}
              placeholder="What's on your mind?"
              className="!text-lg p-0 min-h-[50vh] clear-input-style"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ContentInput;
