"use client";

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/extension/file-upload";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type PostInput } from "@/lib/schema";
import { PaperclipIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { type Dispatch, type SetStateAction } from "react";
import { useFormContext } from "react-hook-form";

const MAX_SIZE_MB = 10,
  MAX_FILES = 10;

type AttachmentsInputProps = {
  attachments: File[];
  setAttachments: Dispatch<SetStateAction<File[]>>;
};

const AttachmentsInput = (props: AttachmentsInputProps) => {
  const t = useTranslations("new.inputs.attachments");
  const { attachments, setAttachments } = props;

  const form = useFormContext<PostInput>();
  const dropZoneConfig = {
    maxFiles: MAX_FILES,
    maxSize: 1024 * 1024 * MAX_SIZE_MB,
    multiple: true,
  };

  return (
    <FormField
      control={form.control}
      name="attachments"
      render={() => (
        <FormItem>
          <FormLabel className="text-muted-foreground">{t("label")}</FormLabel>
          <FormControl>
            <FileUploader
              value={attachments}
              onValueChange={(newFiles) =>
                newFiles && setAttachments([...newFiles])
              }
              dropzoneOptions={dropZoneConfig}
              className="relative rounded-lg"
            >
              <FileInput className="border border-dashed">
                <div className="flex items-center justify-center flex-col gap-1 p-8 w-full ">
                  <PaperclipIcon className="text-muted-foreground" />
                  <p className="text-sm text-muted-foreground font-semibold!">
                    {t("instruction")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("sub-instruction", {
                      maxSize: MAX_SIZE_MB,
                      maxFiles: MAX_FILES,
                    })}
                  </p>
                </div>
              </FileInput>
              <FileUploaderContent className="h-fit">
                {attachments.map((file, i) => (
                  <FileUploaderItem key={i} index={i}>
                    {file.name}
                  </FileUploaderItem>
                ))}
              </FileUploaderContent>
            </FileUploader>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AttachmentsInput;
