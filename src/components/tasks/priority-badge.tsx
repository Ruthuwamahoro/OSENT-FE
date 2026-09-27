import { PRIORITY_META } from "@/components/tasks/meta";
import type { TaskPriority } from "@/utils/types/task";
import { cn } from "@/lib/utils";

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const meta = PRIORITY_META[priority];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", meta.color)}>
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          priority === "urgent" && "bg-destructive",
          priority === "high" && "bg-warning",
          priority === "medium" && "bg-foreground/50",
          priority === "low" && "bg-muted-foreground/50"
        )}
      />
      {meta.label}
    </span>
  );
}
