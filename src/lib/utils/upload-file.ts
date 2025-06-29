import { upload } from "@vercel/blob/client";
import { replaceFileExtension } from "./filename";

export const uploadFile = async (file: File) => {
  let converted = file;

  // convert heic/heif to jpeg
  if (file.type === "image/heic" || file.type === "image/heif") {
    if (typeof window !== "undefined") {
      const heic2any = (await import("heic2any")).default;
      const blob = new Blob([file], { type: file.type });
      const convertedBlob = await heic2any({
        blob,
        toType: "image/jpeg",
        quality: 0.8,
      });
      converted = new File(
        [convertedBlob as Blob],
        replaceFileExtension(file.name, "jpeg"),
        {
          type: "image/jpeg",
        },
      );
    }
  }

  const blob = await upload(converted.name, converted, {
    access: "public",
    handleUploadUrl: "/api/blob/upload",
  });

  return blob.url;
};
