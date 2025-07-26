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
import { categories } from "@/site-config";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

const CategoryInput = () => {
  const tCategory = useTranslations("category");
  const tForm = useTranslations("new.inputs");
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
            <FormLabel className="sr-only">{tForm("category.label")}</FormLabel>
            <Select
              onValueChange={handleCategoryChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-transparent! w-full">
                  <SelectValue placeholder={tForm("category.placeholder")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category, i) => (
                  <SelectItem value={category.slug} key={i}>
                    {tCategory(`${category.slug}.title`)}
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
            <FormLabel className="sr-only">
              {tForm("subcategory.label")}
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="bg-transparent! w-full">
                  <SelectValue placeholder={tForm("subcategory.placeholder")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {form.watch("category") === "" ? (
                  <SelectItem value="error" disabled>
                    {tForm("subcategory.select-category-first")}
                  </SelectItem>
                ) : (
                  categories
                    .find(
                      (category) => category.slug === form.watch("category"),
                    )
                    ?.subcategories.map((subcategory, i) => (
                      <SelectItem value={subcategory.slug} key={i}>
                        {tCategory(
                          `${form.watch("category")}.subcategories.${subcategory.slug}.title`,
                        )}
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
