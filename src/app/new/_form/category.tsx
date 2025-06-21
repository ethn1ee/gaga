import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type PostInput } from "@/lib/schema";
import { useFormContext } from "react-hook-form";

const CategoryInput = () => {
  const form = useFormContext<PostInput>();

  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">Category</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="academics">Academics</SelectItem>
              <SelectItem value="living">Living</SelectItem>
            </SelectContent>
            <FormMessage />
          </Select>
        </FormItem>
      )}
    />
  );
};

export default CategoryInput;
