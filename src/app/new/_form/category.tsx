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
import { categories } from "@/sitemap";
import { useFormContext } from "react-hook-form";

const CategoryInput = () => {
  const form = useFormContext<PostInput>();

  const handleCategoryChange = (value: string) => {
    form.setValue("category", value);
    form.setValue("subcategory", "");
  };

  return (
    <div className="flex max-md:flex-col gap-2 items-center">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="max-md:w-full w-50">
            <FormLabel className="sr-only">Category</FormLabel>
            <Select
              onValueChange={handleCategoryChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category, i) => (
                  <SelectItem value={category.slug} key={i}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
              <FormMessage />
            </Select>
          </FormItem>
        )}
      />

      <span className="max-md:hidden text-xl text-muted-foreground">/</span>

      <FormField
        control={form.control}
        name="subcategory"
        render={({ field }) => (
          <FormItem className="max-md:w-full w-50">
            <FormLabel className="sr-only">Subcategory</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a subcategory" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {form.getValues("category") === "" ? (
                  <SelectItem value="error" disabled>
                    Select a category first
                  </SelectItem>
                ) : (
                  categories
                    .find(
                      (category) =>
                        category.slug === form.getValues("category"),
                    )
                    ?.subcategories.map((subcategory, i) => (
                      <SelectItem value={subcategory.slug} key={i}>
                        {subcategory.name}
                      </SelectItem>
                    ))
                )}
              </SelectContent>
              <FormMessage />
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CategoryInput;
