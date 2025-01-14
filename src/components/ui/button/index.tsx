import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonCoreProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  isLoading?: boolean;
  loaderClassName?: string;
  hideIconOnLoading?: boolean;
  isNotif?: boolean;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonCoreProps;

// const defaultValue: Required<ButtonCoreProps = {
//   variant: "default",
//   size: "default",
//   iconPosition: "start",
//   isLoading: false,
//   hideIconOnLoading: true,
//   asChild: false,
//   isNotif: false,
// }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      icon,
      iconPosition = "start",
      isLoading,
      loaderClassName,
      hideIconOnLoading = true,
      asChild = false,
      isNotif,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const loader: React.ReactNode = (
      <Loader2
        className={cn(
          "size-5 animate-spin",
          {
            "size-4": size === "sm",
            "size-1": size === "icon",
          },
          loaderClassName,
        )}
      />
    );
    const iconRender = hideIconOnLoading ? !isLoading && icon : icon;

    return (
      <Comp
        disabled={isLoading || disabled}
        className={cn(
          buttonVariants({ variant, size, className }),
          "inline-flex items-center gap-2",
        )}
        ref={ref}
        {...props}
      >
        {!isLoading && isNotif && (
          <div
            className={cn("h-2 w-2 animate-pulse rounded-full", {
              "bg-white": variant === "default",
              "bg-primary": variant === "secondary" || variant === "ghost",
            })}
          />
        )}
        {iconPosition === "start" && (
          <>
            {isLoading && loader}
            {iconRender}
          </>
        )}
        {children}
        {iconPosition === "end" && (
          <>
            {isLoading && loader}
            {iconRender}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
