import { cn } from "@/lib/utils";

const GlassCard = ({ children, className = "", as: Component = "div" }) => {
  return <Component className={cn("glass-card rounded-2xl", className)}>{children}</Component>;
};

export default GlassCard;
