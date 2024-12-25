/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as React from "react";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type * as InputPrimitive from "../input-primitive";

export const inputVariants = cva(
  "flex items-center h-10 w-full text-sm bg-transparent file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border border-transparent focus-within:outline-none aria-invalid:ring-1 aria-invalid:ring-destructive aria-invalid:focus-within:ring-2 aria-invalid:focus-within:ring-destructive",
  {
    variants: {
      rounded: {
        none: "rounded-none",
        md: "rounded-md",
      },
      variant: {
        outline:
          "border-border focus-within:border-primary focus-within:shadow-[0_0px_0px_1px_hsl(var(--primary))] aria-invalid:border-transparent",
        filled:
          "border-2 bg-background focus-within:border-primary focus-within:bg-transparent",
        underlined:
          "rounded-none border-b-border focus-within:border-b-primary focus-within:shadow-[0_1px_0px_0px_hsl(var(--primary))]",
        unstyled: "",
      },
    },
    defaultVariants: {
      rounded: "md",
      variant: "outline",
    },
  },
);

export interface InputProps<
  T extends InputPrimitive.InputType = "text",
  M extends boolean | undefined = undefined,
> extends InputPrimitive.InputProps<T, M>,
    VariantProps<typeof inputVariants> {
  containerClassName?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  startAdornmentClassName?: string;
  endAdornmentClassName?: string;
}

const Input = <
  T extends InputPrimitive.InputType = "text",
  M extends boolean | undefined = undefined,
>(
  {
    className,
    containerClassName,
    rounded,
    variant,
    type = "text" as T,
    value,
    startAdornment,
    endAdornment,
    startAdornmentClassName,
    endAdornmentClassName,
    ...props
  }: InputProps<T, M>,
  ref: React.Ref<HTMLInputElement>,
) => {
  return (
    <div
      className={cn(
        inputVariants({ variant, rounded, className: containerClassName }),
        "relative flex items-center",
      )}
    >
      {startAdornment && (
        <div
          className={cn(
            "inline-flex h-full items-center text-muted-foreground",
            "py-2 pl-3 pr-1.5",
            "rounded-l-md has-[+input:focus]:rounded-l-sm has-[+input:focus]:border-l-0", // this must be same with default value of variant
            {
              "rounded-l-md": rounded === "md",
              "rounded-l-none": rounded === "none",
            },
            startAdornmentClassName,
          )}
        >
          {startAdornment}
        </div>
      )}
      <input
        ref={ref}
        type={type}
        value={
          value !== undefined && value !== null
            ? type === "file"
              ? undefined
              : type === "number"
                ? String(value ?? "")
                : (value as string)
            : undefined
        }
        className={cn(
          "w-full overflow-clip bg-transparent px-3 py-2 outline-none focus-visible:outline-none",
          {
            "pl-1.5": !!startAdornment,
            "pr-1.5": !!endAdornment,
          },
          className,
        )}
        {...props}
      />
      {endAdornment && (
        <div
          className={cn(
            "inline-flex items-center text-muted-foreground",
            "py-2 pl-1.5 pr-3",
            "rounded-r-md has-[+input:focus]:rounded-r-sm has-[+input:focus]:border-r-0", // this must be same with default value of variant
            {
              "rounded-r-md": rounded === "md",
              "rounded-r-none": rounded === "none",
            },
            endAdornmentClassName,
          )}
        >
          {endAdornment}
        </div>
      )}
    </div>
  );
};

Input.displayName = "Input";

export { Input };
export default Input;
