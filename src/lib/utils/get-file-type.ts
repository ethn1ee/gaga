export const getFileType = (file: string): "image" | "document" | "etc" => {
  const extension = file.split(".").pop()?.toLowerCase();

  if (!extension) {
    return "etc";
  }

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "jfif":
    case "pjpeg":
    case "pjp":
    case "png":
    case "apng":
    case "avif":
    case "gif":
    case "webp":
    case "svg":
      return "image";
    case "pdf":
    case "docx":
    case "doc":
    case "xlsx":
    case "xls":
    case "pptx":
    case "ppt":
    case ".rtf":
    case "hwp":
    case "txt":
    case "md":
      return "document";
    default:
      return "etc";
  }
};
