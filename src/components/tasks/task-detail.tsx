"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  MoreHorizontal,
  Pencil,
  RotateCcw,
  UserCog,
  Ban,
  Building2,
  Package,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/tasks/status-badge";
import { PriorityBadge } from "@/components/tasks/priority-badge";
import { TaskActivity } from "@/components/tasks/task-activity";
import { TaskComments } from "@/components/tasks/task-comments";
import { RequestReviewDialog } from "@/components/tasks/review-dialog";
import { ReviewActions } from "@/components/tasks/resolve-review-dialog";
import { TYPE_LABELS, RELATED_TYPE_LABELS } from "@/components/tasks/meta";
import { formatDueDate, formatRelative, initials } from "@/lib/utils";
import type { Task, Person, Comment, ReviewRequest, ReviewOutcome } from "@/utils/types/task";

interface TaskDetailProps {
  task: Task;
  people: Record<string, Person>;
  currentUserId: string;
  onUpdate: (task: Task) => void;
}

export function TaskDetail({ task, people, currentUserId, onUpdate }: TaskDetailProps) {
  const [reassigning, setReassigning] = useState(false);
  const assignee = people[task.assigneeId];
  const creator = people[task.creatorId];
  const isMine = task.assigneeId === currentUserId;
  const iAmReviewer = task.currentReviewRequest?.reviewerId === currentUserId;
  const iRequestedReview = task.currentReviewRequest?.requestedById === currentUserId;
  const latestOutcome = task.reviewHistory?.[task.reviewHistory.length - 1];

  function addActivity(kind: Parameters<typeof pushActivity>[1], message: string, detail?: string) {
    return pushActivity(task, kind, message, detail, currentUserId);
  }

  function markComplete() {
    onUpdate({
      ...task,
      status: "completed",
      lastActivityAt: new Date().toISOString(),
      activity: addActivity("completed", "marked this task as complete."),
    });
  }

  function cancelTask() {
    onUpdate({
      ...task,
      status: "cancelled",
      lastActivityAt: new Date().toISOString(),
      activity: addActivity("cancelled", "cancelled this task."),
    });
  }

  function handleRequestReview(request: ReviewRequest) {
    const reviewerName = people[request.reviewerId]?.name ?? "the reviewer";
    onUpdate({
      ...task,
      status: "awaiting_review",
      currentReviewRequest: request,
      lastActivityAt: new Date().toISOString(),
      activity: pushActivity(
        task,
        "submitted_for_review",
        `submitted the task for review to ${reviewerName}.`,
        undefined,
        currentUserId
      ),
    });
  }

  function handleResolveReview(outcome: ReviewOutcome) {
    const nextStatus =
      outcome.outcome === "approved" ? "completed" : outcome.outcome === "rejected" ? "rejected" : "changes_requested";
    const kind = outcome.outcome === "approved" ? "approved" : outcome.outcome === "rejected" ? "rejected" : "changes_requested";
    const message =
      outcome.outcome === "approved"
        ? "approved this task."
        : outcome.outcome === "rejected"
        ? "rejected this task."
        : "requested changes.";

    onUpdate({
      ...task,
      status: nextStatus,
      currentReviewRequest: undefined,
      reviewHistory: [...(task.reviewHistory ?? []), outcome],
      lastActivityAt: new Date().toISOString(),
      activity: pushActivity(task, kind, message, outcome.reason, currentUserId),
    });
  }

  function handleResubmit() {
    onUpdate({
      ...task,
      status: "in_progress",
      lastActivityAt: new Date().toISOString(),
      activity: addActivity("resubmitted", "started fixing this task."),
    });
  }

  function handleReassign(newAssigneeId: string) {
    const name = people[newAssigneeId]?.name ?? "someone";
    onUpdate({
      ...task,
      assigneeId: newAssigneeId,
      isUnopened: newAssigneeId !== currentUserId,
      lastActivityAt: new Date().toISOString(),
      activity: pushActivity(task, "reassigned", `reassigned this task to ${name}.`, undefined, currentUserId),
    });
    setReassigning(false);
  }

  function handleAddComment(comment: Comment) {
    onUpdate({
      ...task,
      comments: [...task.comments, comment],
      lastActivityAt: new Date().toISOString(),
    });
  }

  const canComplete = !["completed", "cancelled"].includes(task.status);
  const canSubmitForReview = isMine && !["awaiting_review", "completed", "cancelled"].includes(task.status);
  const canCancel = !["completed", "cancelled"].includes(task.status);

  return (
    <div>
      <Link href="/tasks" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Tasks
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_19rem]">
        {/* Main column */}
        <div className="min-w-0 space-y-6">
          <div>
            <p className="text-xs text-muted-foreground">{task.reference}</p>
            <div className="mt-1 flex flex-wrap items-start justify-between gap-3">
              <h1 className="text-xl font-semibold leading-snug text-foreground">{task.title}</h1>
              <div className="flex shrink-0 items-center gap-2">
                <TaskActionsMenu
                  canComplete={canComplete}
                  canCancel={canCancel}
                  onComplete={markComplete}
                  onCancel={cancelTask}
                  onReassign={() => setReassigning((v) => !v)}
                />
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StatusBadge task={task} />
              <PriorityBadge priority={task.priority} />
              <span className="text-xs text-muted-foreground">{TYPE_LABELS[task.type]}</span>
            </div>
          </div>

          {reassigning && (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 p-3">
              <UserCog className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Reassign to</span>
              <Select onValueChange={(value) => {
    if (typeof value === 'string') {
      handleReassign(value);
    }
  }}>
                <SelectTrigger className="h-8 w-48 text-sm">
                  <SelectValue placeholder="Choose a person" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(people)
                    .filter((p) => p.id !== task.assigneeId)
                    .map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" onClick={() => setReassigning(false)}>
                Cancel
              </Button>
            </div>
          )}

          {(task.status === "rejected" || task.status === "changes_requested") && latestOutcome && (
            <div className="space-y-3 rounded-lg border border-destructive/25 bg-destructive/5 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">
                  {task.status === "rejected" ? "This task was rejected." : "Changes were requested."}
                </p>
                <span className="text-xs text-muted-foreground">{formatRelative(latestOutcome.decidedAt)}</span>
              </div>
              <p className="text-sm text-muted-foreground">{latestOutcome.reason}</p>
              <p className="text-xs text-muted-foreground">
                By {people[latestOutcome.reviewerId]?.name} · Previous submission: {formatRelative(task.lastActivityAt)}
              </p>
              {isMine && (
                <Button size="sm" className="gap-1.5" onClick={handleResubmit}>
                  <RotateCcw className="h-3.5 w-3.5" />
                  Fix & Resubmit
                </Button>
              )}
            </div>
          )}

          {task.currentReviewRequest && iAmReviewer && (
            <ReviewActions reviewerId={currentUserId} onResolve={handleResolveReview} />
          )}

          {task.currentReviewRequest && iRequestedReview && (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm font-medium text-foreground">Awaiting review</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {people[task.currentReviewRequest.reviewerId]?.name} is reviewing this task.
              </p>
              <p className="mt-2 rounded-md bg-card px-2.5 py-1.5 text-xs text-muted-foreground">
                &ldquo;{task.currentReviewRequest.message}&rdquo;
              </p>
            </div>
          )}

          <section>
            <h2 className="mb-2 text-sm font-medium text-foreground">Description</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{task.description}</p>
          </section>

          {task.relatedTo && (
            <section>
              <h2 className="mb-2 text-sm font-medium text-foreground">Related business information</h2>
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary">
                    <Building2 className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">{RELATED_TYPE_LABELS[task.relatedTo.type]}</p>
                    <p className="truncate text-sm font-medium text-foreground">{task.relatedTo.label}</p>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                      {task.relatedTo.customer && (
                        <span className="inline-flex items-center gap-1">
                          <Building2 className="h-3.5 w-3.5" />
                          {task.relatedTo.customer}
                        </span>
                      )}
                      {task.relatedTo.amount && (
                        <span className="inline-flex items-center gap-1">
                          <Wallet className="h-3.5 w-3.5" />
                          {task.relatedTo.amount}
                        </span>
                      )}
                      {task.relatedTo.itemCount && (
                        <span className="inline-flex items-center gap-1">
                          <Package className="h-3.5 w-3.5" />
                          {task.relatedTo.itemCount} items
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <Separator />

          <section>
            <h2 className="mb-3 text-sm font-medium text-foreground">Activity</h2>
            <TaskActivity activity={task.activity} people={people} />
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 text-sm font-medium text-foreground">Comments</h2>
            <TaskComments
              comments={task.comments}
              people={people}
              currentUserId={currentUserId}
              onAddComment={handleAddComment}
            />
          </section>
        </div>

        {/* Right rail */}
        <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="space-y-3 rounded-lg border border-border p-4">
            {canSubmitForReview && (
              <RequestReviewDialog people={Object.values(people)} currentUserId={currentUserId} onSubmit={handleRequestReview} />
            )}
            {canComplete && (
              <Button variant="secondary" size="sm" className="w-full gap-1.5" onClick={markComplete}>
                <CheckCircle2 className="h-4 w-4" />
                Mark as Complete
              </Button>
            )}
            <Separator />
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Assignee</dt>
                <dd className="flex items-center gap-1.5 font-medium text-foreground">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[9px]">{initials(assignee?.name ?? "?")}</AvatarFallback>
                  </Avatar>
                  {assignee?.name}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Creator</dt>
                <dd className="flex items-center gap-1.5 font-medium text-foreground">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[9px]">{initials(creator?.name ?? "?")}</AvatarFallback>
                  </Avatar>
                  {creator?.name}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Created</dt>
                <dd className="text-foreground">{formatRelative(task.createdAt)}</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Due date</dt>
                <dd className="font-medium text-foreground">{formatDueDate(task.dueDate)}</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Reference</dt>
                <dd className="text-foreground">{task.reference}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskActionsMenu({
  canComplete,
  canCancel,
  onComplete,
  onCancel,
  onReassign,
}: {
  canComplete: boolean;
  canCancel: boolean;
  onComplete: () => void;
  onCancel: () => void;
  onReassign: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={onReassign} className="gap-2">
          <UserCog className="h-4 w-4" />
          Reassign
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        {canComplete && (
          <DropdownMenuItem onSelect={onComplete} className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Mark as complete
          </DropdownMenuItem>
        )}
        {canCancel && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onCancel} className="gap-2 text-destructive focus:text-destructive">
              <Ban className="h-4 w-4" />
              Cancel task
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function pushActivity(
  task: Task,
  kind: Task["activity"][number]["kind"],
  message: string,
  detail: string | undefined,
  actorId: string
) {
  return [
    ...task.activity,
    {
      id: `a-${Date.now()}`,
      kind,
      actorId,
      createdAt: new Date().toISOString(),
      message,
      detail,
    },
  ];
}
