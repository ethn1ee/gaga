import { Button } from "@/components/ui/button";
import { extractOriginalFilename, getFileType } from "@/lib/utils";
import { type Post } from "@prisma/client";
import { PaperclipIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type AttachmentsProp = {
  attachments: Post["attachments"];
};

const Attachments = ({ attachments }: AttachmentsProp) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {attachments.map((file, i) => {
        const fileName = extractOriginalFilename(file);

        return (
          <Button
            key={i}
            variant="outline"
            asChild
            className="h-fit w-fit p-1 not-hover:!bg-transparent"
          >
            <Link href={file} className="flex gap-2 items-center">
              <div className="size-10 shrink-0 rounded-sm overflow-hidden relative flex items-center justify-center">
                <FileThumbnail file={file} />
              </div>
              <span className="max-w-30 mr-2 text-sm overflow-ellipsis whitespace-nowrap overflow-hidden">
                {decodeURIComponent(fileName)}
              </span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
};

export default Attachments;

type FileThumbnailProps = {
  file: string;
};

const FileThumbnail = ({ file }: FileThumbnailProps) => {
  switch (getFileType(file)) {
    case "image":
      return <Image src={file} alt={file} fill sizes="40px" />;
    default:
      return <PaperclipIcon className="text-muted-foreground" />;
  }
};
