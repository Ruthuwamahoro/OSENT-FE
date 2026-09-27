"use client";

import type { ComponentType } from "react";

type BusinessEmptyStateProps = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

export function BusinessEmptyState({
  icon: Icon,
  title,
  description,
}: BusinessEmptyStateProps) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 py-12 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>

      <h2 className="text-base font-semibold text-foreground">{title}</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
