import { ListChecks, CalendarClock, Eye, AlertTriangle } from "lucide-react";
import type { TaskSummaryCounts } from "@/lib/task-queries";
import { cn } from "@/lib/utils";

const items = (counts: TaskSummaryCounts) => [
  { label: "My Tasks", value: counts.myTasks, icon: ListChecks },
  { label: "Due Today", value: counts.dueToday, icon: CalendarClock },
  { label: "Waiting for Review", value: counts.waitingForReview, icon: Eye },
  {
    label: "Overdue",
    value: counts.overdue,
    icon: AlertTriangle,
    emphasize: counts.overdue > 0,
  },
];

export function TaskSummary({ counts }: { counts: TaskSummaryCounts }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items(counts).map(({ label, value, icon: Icon, emphasize }) => (
        <div
          key={label}
          className={cn(
            "flex items-center gap-3 rounded-lg border border-border px-3 py-2.5",
            emphasize && "border-destructive/30 bg-destructive/5"
          )}
        >
          <Icon className={cn("h-4 w-4 shrink-0", emphasize ? "text-destructive" : "text-muted-foreground")} />
          <div className="min-w-0">
            <p className={cn("text-lg font-semibold leading-none", emphasize && "text-destructive")}>
              {value}
            </p>
            <p className="truncate text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
