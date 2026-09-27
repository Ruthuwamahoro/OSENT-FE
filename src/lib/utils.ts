import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Human-friendly relative time, e.g. "15 minutes ago", "Yesterday, 4:20 PM". */
export function formatRelative(dateIso: string, now: Date = new Date()): string {
  const date = new Date(dateIso);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.round(diffMs / 60000);
  const diffHr = Math.round(diffMin / 60);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;

  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  if (isToday) return `Today, ${time}`;
  if (isYesterday) return `Yesterday, ${time}`;
  if (diffHr < 24 * 6) {
    return date.toLocaleDateString("en-US", { weekday: "long" }) + `, ${time}`;
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + `, ${time}`;
}

/** Short, calm due-date label: "Today", "Tomorrow", "In 3 days", "3 days overdue". */
export function formatDueDate(dateIso: string, now: Date = new Date()): string {
  const date = new Date(dateIso);
  const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round(
    (startOf(date).getTime() - startOf(now).getTime()) / 86400000
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days overdue`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function isOverdue(dateIso: string, status: string, now: Date = new Date()): boolean {
  if (status === "completed" || status === "cancelled") return false;
  return new Date(dateIso).getTime() < now.getTime();
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
