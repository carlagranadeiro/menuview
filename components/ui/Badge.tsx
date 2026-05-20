"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-surface-800 text-surface-300",
    primary: "bg-primary-600/20 text-primary-400 border border-primary-600/30",
    success: "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30",
    warning: "bg-amber-600/20 text-amber-400 border border-amber-600/30",
    danger: "bg-red-600/20 text-red-400 border border-red-600/30",
    outline: "bg-transparent text-surface-400 border border-surface-700",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium uppercase tracking-wider",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
