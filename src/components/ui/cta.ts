import { cva, type VariantProps } from "class-variance-authority";

export const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-signal text-on-signal hover:shadow-signal-glow",
        outline: "border border-line text-ink hover:border-signal hover:text-signal",
        ghost: "text-muted hover:text-ink",
      },
      size: {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-7 py-3.5 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type CtaVariantProps = VariantProps<typeof ctaVariants>;
