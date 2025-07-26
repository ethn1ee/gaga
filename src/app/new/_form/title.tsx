import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type PostInput } from "@/lib/schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

const TitleInput = () => {
  const t = useTranslations("new.inputs.title");
  const form = useFormContext<PostInput>();

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">{t("label")}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={t("placeholder")}
              className="!text-4xl rounded-none p-0 clear-input-style h-10"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TitleInput;
