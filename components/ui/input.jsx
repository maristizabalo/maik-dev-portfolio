import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-[48px] rounded-md border border-pink-100 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-5 text-base font-light text-plum dark:text-white placeholder:text-mauve/60 dark:placeholder:text-white/50 outline-none focus:border-accent",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
