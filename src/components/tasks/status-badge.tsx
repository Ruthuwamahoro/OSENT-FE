import { Badge } from "@/components/ui/badge";
import { STATUS_META, OVERDUE_META } from "@/components/tasks/meta";
import { isOverdue } from "@/lib/utils";
import type { Task } from "@/utils/types/task";

export function StatusBadge({ task }: { task: Task }) {
  const overdue = isOverdue(task.dueDate, task.status);
  const meta = overdue ? OVERDUE_META : STATUS_META[task.status];

  return (
    <Badge variant={meta.badge} className="font-normal">
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </Badge>
  );
}
