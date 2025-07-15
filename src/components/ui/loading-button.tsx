import { Loader2Icon } from "lucide-react";
import { type ComponentProps } from "react";
import { Button } from "./button";

type LoadingButtonProps = {
  isLoading: boolean;
} & ComponentProps<typeof Button>;

export const LoadingButton = ({
  isLoading,
  className,
  children,
  variant,
  size,
  asChild = false,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      asChild={asChild}
      className={className}
      {...props}
    >
      {isLoading ? <Loader2Icon className="animate-spin" /> : children}
    </Button>
  );
};
