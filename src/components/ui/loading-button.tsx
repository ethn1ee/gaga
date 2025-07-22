import { Loader2Icon } from "lucide-react";
import { type ComponentProps } from "react";
import { Button } from "./button";

type LoadingButtonProps = {
  isLoading: boolean;
  disabled?: boolean;
} & ComponentProps<typeof Button>;

export const LoadingButton = ({
  isLoading,
  disabled = isLoading,
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
      disabled={disabled}
      className={className}
      {...props}
    >
      {isLoading ? <Loader2Icon className="animate-spin" /> : children}
    </Button>
  );
};
