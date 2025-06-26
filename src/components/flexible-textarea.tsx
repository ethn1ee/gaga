import { cn } from "@/lib/utils";
import { type ComponentProps, useEffect, useRef } from "react";
import { Textarea } from "./ui/textarea";

const FlexibleTextarea = ({
  className,
  ...props
}: ComponentProps<"textarea">) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  // useEffect(() => {
  //   const handleInput = function (this: HTMLTextAreaElement) {
  //     this.style.height = "auto";
  //     this.style.height = this.scrollHeight + "px";
  //   };

  //   const textarea = ref.current;
  //   if (!textarea) return;

  //   textarea.style.height = textarea.scrollHeight + "px";
  //   textarea.style.overflowY = "hidden";

  //   textarea.addEventListener("input", handleInput);

  //   return () => {
  //     textarea.removeEventListener("input", handleInput);
  //   };
  // }, [ref.current?.value]);

  return (
    <Textarea
      {...props}
      ref={ref}
      className={cn("field-sizing-content", className)}
    />
  );
};

export default FlexibleTextarea;
