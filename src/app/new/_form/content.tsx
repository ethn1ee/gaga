import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type PostInput } from "@/lib/schema";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

const ContentInput = () => {
  const t = useTranslations("new.inputs.content");
  const form = useFormContext<PostInput>();

  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">{t("label")}</FormLabel>
          <FormControl>
            <TextareaAutosize
              {...field}
              placeholder={t("placeholder")}
              className="!text-lg p-0 min-h-[50vh] resize-none focus-visible:outline-none"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ContentInput;
