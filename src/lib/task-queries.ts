import type { Task, TaskView } from "@/utils/types/task";
import { isOverdue } from "@/lib/utils";

const ACTIVE_STATUSES: Task["status"][] = [
  "new",
  "in_progress",
  "pending",
  "awaiting_review",
  "changes_requested",
];

export function getTasksForView(tasks: Task[], view: TaskView, userId: string): Task[] {
  switch (view) {
    case "my_tasks":
      return tasks.filter((t) => t.assigneeId === userId && ACTIVE_STATUSES.includes(t.status));
    case "assigned_by_me":
      return tasks.filter((t) => t.creatorId === userId && t.assigneeId !== userId);
    case "created":
      return tasks.filter((t) => t.creatorId === userId);
    case "submitted_for_review":
      return tasks.filter((t) => t.currentReviewRequest?.requestedById === userId);
    case "waiting_for_my_review":
      return tasks.filter((t) => t.currentReviewRequest?.reviewerId === userId);
    case "rejected":
      return tasks.filter((t) => t.status === "rejected" && t.assigneeId === userId);
    case "completed":
      return tasks.filter(
        (t) => t.status === "completed" && (t.assigneeId === userId || t.creatorId === userId)
      );
    case "all":
    default:
      return tasks;
  }
}

/** Tasks where the current user has something to do next. */
export function getWaitingForYou(tasks: Task[], userId: string): Task[] {
  return tasks.filter((t) => {
    if (t.currentReviewRequest?.reviewerId === userId) return true;
    if (t.assigneeId !== userId) return false;
    if (t.status === "changes_requested" || t.status === "rejected") return true;
    if (isOverdue(t.dueDate, t.status)) return true;
    return false;
  });
}

export function getNewlyAssigned(tasks: Task[], userId: string): Task[] {
  return tasks.filter((t) => t.assigneeId === userId && t.isUnopened);
}

export interface TaskSummaryCounts {
  myTasks: number;
  dueToday: number;
  waitingForReview: number;
  overdue: number;
}

export function getSummaryCounts(tasks: Task[], userId: string): TaskSummaryCounts {
  const mine = tasks.filter((t) => t.assigneeId === userId && ACTIVE_STATUSES.includes(t.status));
  const todayStr = new Date().toDateString();

  return {
    myTasks: mine.length,
    dueToday: mine.filter((t) => new Date(t.dueDate).toDateString() === todayStr).length,
    waitingForReview: tasks.filter((t) => t.currentReviewRequest?.reviewerId === userId).length,
    overdue: mine.filter((t) => isOverdue(t.dueDate, t.status)).length,
  };
}

export interface TaskFilters {
  status?: Task["status"];
  priority?: Task["priority"];
  assigneeId?: string;
  creatorId?: string;
  type?: Task["type"];
  search?: string;
}

export function applyFilters(tasks: Task[], filters: TaskFilters, personName: (id: string) => string): Task[] {
  return tasks.filter((t) => {
    if (filters.status && t.status !== filters.status) return false;
    if (filters.priority && t.priority !== filters.priority) return false;
    if (filters.assigneeId && t.assigneeId !== filters.assigneeId) return false;
    if (filters.creatorId && t.creatorId !== filters.creatorId) return false;
    if (filters.type && t.type !== filters.type) return false;

    if (filters.search) {
      const q = filters.search.trim().toLowerCase();
      if (!q) return true;
      const haystack = [
        t.title,
        t.description,
        t.reference,
        t.relatedTo?.id,
        t.relatedTo?.label,
        t.relatedTo?.customer,
        personName(t.assigneeId),
        personName(t.creatorId),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}
