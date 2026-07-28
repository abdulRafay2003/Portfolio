"use client";

import { Children, cloneElement, forwardRef, isValidElement, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-swift disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        // Primary: light-on-dark, the single highest-contrast action per screen.
        primary:
          "bg-chalk text-void shadow-[0_1px_0_0_rgb(255_255_255/0.6)_inset,0_10px_30px_-10px_rgb(0_0_0/0.8)] hover:bg-white",
        accent:
          "bg-iris text-white shadow-[0_10px_36px_-12px_rgb(124_107_255/0.9)] hover:bg-iris-soft hover:shadow-[0_14px_44px_-10px_rgb(124_107_255/1)]",
        outline: "glass text-chalk hover:border-white/25 hover:bg-white/[0.07]",
        ghost: "text-ash hover:bg-white/[0.06] hover:text-chalk",
      },
      size: {
        sm: "h-9 px-4 text-[0.8125rem]",
        md: "h-11 px-5 text-sm",
        lg: "h-14 px-7 text-[0.9375rem]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean;
  /** Adds a sweeping sheen on hover. Off for ghost/low-emphasis buttons. */
  sheen?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, sheen = true, children, ...props }, ref) => {
    const classes = cn(button({ variant, size }), className);

    /**
     * The sheen and the z-indexed content wrapper are decoration that must live
     * *inside* the rendered element. With `asChild` the rendered element is the
     * caller's own child, so the decoration is injected into that child rather
     * than wrapped around it — Slot accepts exactly one child and would drop
     * anything wrapped outside it.
     */
    const decorate = (inner: ReactNode) => (
      <>
        {sheen && variant !== "ghost" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-swift group-hover/btn:translate-x-full"
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">{inner}</span>
      </>
    );

    if (asChild) {
      const child = Children.only(children);
      if (!isValidElement<{ children?: ReactNode }>(child)) return null;
      return (
        <Slot ref={ref} className={classes} {...props}>
          {cloneElement(child, undefined, decorate(child.props.children))}
        </Slot>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {decorate(children)}
      </button>
    );
  },
);
Button.displayName = "Button";
