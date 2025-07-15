import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type PostInput } from "@/lib/schema";
import { useFormContext } from "react-hook-form";

const TitleInput = () => {
  const form = useFormContext<PostInput>();

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">Title</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Untitled"
              className="!text-4xl p-0 clear-input-style h-10"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TitleInput;
