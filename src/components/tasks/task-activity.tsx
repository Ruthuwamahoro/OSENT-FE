import {
  CheckCircle2,
  Circle,
  FileEdit,
  MessageSquare,
  RotateCcw,
  Send,
  UserPlus,
  XCircle,
  Ban,
  Eye,
} from "lucide-react";
import { formatRelative } from "@/lib/utils";
import type { ActivityEvent, ActivityKind, Person } from "@/utils/types/task";
import { cn } from "@/lib/utils";

const ICONS: Record<ActivityKind, typeof Circle> = {
  created: FileEdit,
  assigned: UserPlus,
  status_changed: Circle,
  submitted_for_review: Send,
  review_requested: Eye,
  approved: CheckCircle2,
  changes_requested: RotateCcw,
  rejected: XCircle,
  resubmitted: Send,
  commented: MessageSquare,
  completed: CheckCircle2,
  reassigned: UserPlus,
  cancelled: Ban,
};

const TONE: Partial<Record<ActivityKind, string>> = {
  approved: "text-success",
  completed: "text-success",
  rejected: "text-destructive",
  changes_requested: "text-warning",
};

export function TaskActivity({ activity, people }: { activity: ActivityEvent[]; people: Record<string, Person> }) {
  const sorted = [...activity].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <ol className="space-y-4">
      {sorted.map((event) => {
        const Icon = ICONS[event.kind] ?? Circle;
        const actor = people[event.actorId];
        return (
          <li key={event.id} className="flex gap-3">
            <div
              className={cn(
                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted",
                TONE[event.kind] ?? "text-muted-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1 pb-0.5">
              <p className="text-sm text-foreground">
                <span className="font-medium">{actor?.name ?? "Someone"}</span> {event.message}
              </p>
              {event.detail && (
                <p className="mt-1 rounded-md bg-muted px-2.5 py-1.5 text-xs text-muted-foreground">{event.detail}</p>
              )}
              <p className="mt-0.5 text-xs text-muted-foreground">{formatRelative(event.createdAt)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
