"use client";

import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/tasks/status-badge";
import { PriorityBadge } from "@/components/tasks/priority-badge";
import { EmptyState } from "@/components/tasks/empty-state";
import { TYPE_LABELS } from "@/components/tasks/meta";
import { formatDueDate, formatRelative, initials, isOverdue } from "@/lib/utils";
import type { Task,Person } from "@/utils/types/task";
import { cn } from "@/lib/utils";

interface TaskListProps {
  tasks: Task[];
  people: Record<string, Person>;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function TaskList({
  tasks,
  people,
  emptyTitle = "Nothing here",
  emptyDescription = "There's nothing to show for this view right now.",
}: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState icon={ClipboardList} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      {/* Desktop table */}
      <table className="hidden w-full text-sm md:table">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
            <th className="px-4 py-2.5 font-medium">Task</th>
            <th className="px-3 py-2.5 font-medium">Related</th>
            <th className="px-3 py-2.5 font-medium">Assignee</th>
            <th className="px-3 py-2.5 font-medium">Priority</th>
            <th className="px-3 py-2.5 font-medium">Due</th>
            <th className="px-3 py-2.5 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tasks.map((task) => {
            const assignee = people[task.assigneeId];
            const overdue = isOverdue(task.dueDate, task.status);
            return (
              <tr key={task.id} className="group transition-colors hover:bg-muted/30">
                <td className="px-4 py-3 align-top">
                  <Link href={`/tasks/${task.id}`} className="block max-w-xs">
                    <div className="flex items-start gap-2">
                      {task.isUnopened && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                      <div className="min-w-0">
                        <p className="truncate font-medium leading-snug text-foreground group-hover:underline">
                          {task.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {TYPE_LABELS[task.type]} · {task.reference}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-3 py-3 align-top text-muted-foreground">
                  {task.relatedTo ? (
                    <span className="line-clamp-2 max-w-[12rem] text-xs">{task.relatedTo.label}</span>
                  ) : (
                    <span className="text-xs">—</span>
                  )}
                </td>
                <td className="px-3 py-3 align-top">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px]">{initials(assignee?.name ?? "?")}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-foreground">{assignee?.name}</span>
                  </div>
                </td>
                <td className="px-3 py-3 align-top">
                  <PriorityBadge priority={task.priority} />
                </td>
                <td className={cn("px-3 py-3 align-top text-xs", overdue ? "font-medium text-destructive" : "text-muted-foreground")}>
                  {formatDueDate(task.dueDate)}
                </td>
                <td className="px-3 py-3 align-top">
                  <StatusBadge task={task} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile cards */}
      <ul className="divide-y divide-border md:hidden">
        {tasks.map((task) => {
          const assignee = people[task.assigneeId];
          return (
            <li key={task.id}>
              <Link href={`/tasks/${task.id}`} className="block px-4 py-3.5 active:bg-muted/40">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-start gap-2">
                    {task.isUnopened && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                    <p className="truncate font-medium leading-snug text-foreground">{task.title}</p>
                  </div>
                  <StatusBadge task={task} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {TYPE_LABELS[task.type]}
                  {task.relatedTo ? ` · ${task.relatedTo.label}` : ""}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-[9px]">{initials(assignee?.name ?? "?")}</AvatarFallback>
                    </Avatar>
                    <span>{assignee?.name}</span>
                  </div>
                  <span className={cn(isOverdue(task.dueDate, task.status) && "font-medium text-destructive")}>
                    {formatDueDate(task.dueDate)}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function lastActivityLabel(task: Task) {
  return formatRelative(task.lastActivityAt);
}
