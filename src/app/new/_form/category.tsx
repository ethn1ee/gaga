import { navGroups } from "@/components/nav";
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
import { toSlug } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

const CategoryInput = () => {
  const form = useFormContext<PostInput>();

  return (
    <div className="flex gap-2 items-center">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {navGroups.map((group, i) => (
                  <SelectItem value={toSlug(group.title)} key={i}>
                    {group.title}
                  </SelectItem>
                ))}
              </SelectContent>
              <FormMessage />
            </Select>
          </FormItem>
        )}
      />

      <span className="text-xl text-muted-foreground">/</span>

      <FormField
        control={form.control}
        name="subcategory"
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a subcategory" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {form.getValues("category") === "" ? (
                <SelectItem value="error" disabled>
                  Select a category first
                </SelectItem>
              ) : (
                navGroups
                  .find(
                    (group) =>
                      toSlug(group.title) === form.getValues("category"),
                  )
                  ?.items.map((item, i) => (
                    <SelectItem value={toSlug(item.title)} key={i}>
                      {item.title}
                    </SelectItem>
                  ))
              )}
            </SelectContent>
            <FormMessage />
          </Select>
        )}
      />
    </div>
  );
};

export default CategoryInput;
