// ---------------------------------------------------------------------------
// Core OSENT Tasks types.
// Keep this file the single source of truth for the task data shape.
// When the real OSENT API is ready, these types can move to a shared
// `@osent/types` package and the mock data in `data/tasks.ts` can be
// replaced with API responses that satisfy the same shapes.
// ---------------------------------------------------------------------------

export type TaskType =
  | "general"
  | "sales"
  | "customer"
  | "supplier"
  | "procurement"
  | "inventory"
  | "document"
  | "finance"
  | "delivery"
  | "review"
  | "follow-up"
  | "administrative";

export type TaskStatus =
  | "new"
  | "in_progress"
  | "pending"
  | "awaiting_review"
  | "changes_requested"
  | "rejected"
  | "completed"
  | "cancelled";
// Note: "overdue" is not stored as a status — it's derived from dueDate
// against any status that isn't completed/cancelled. See lib/utils.ts.

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type RelatedEntityType =
  | "customer"
  | "supplier"
  | "invoice"
  | "purchase_order"
  | "proforma_invoice"
  | "proforma_request"
  | "delivery_note"
  | "sales_order"
  | "inventory_item"
  | "procurement_request";

export interface RelatedEntity {
  type: RelatedEntityType;
  id: string;
  label: string;
  /** Optional extra business context shown on the task detail page. */
  customer?: string;
  amount?: string;
  itemCount?: number;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  /** Initials-based avatar is used when avatarUrl is absent (always, in this mock). */
  avatarUrl?: string;
}

export interface Comment {
  id: string;
  authorId: string;
  body: string;
  createdAt: string; // ISO date
  mentions?: string[]; // person ids
  replies?: Comment[];
}

export type ActivityKind =
  | "created"
  | "assigned"
  | "status_changed"
  | "submitted_for_review"
  | "review_requested"
  | "approved"
  | "changes_requested"
  | "rejected"
  | "resubmitted"
  | "commented"
  | "completed"
  | "reassigned"
  | "cancelled";

export interface ActivityEvent {
  id: string;
  kind: ActivityKind;
  actorId: string;
  createdAt: string; // ISO date
  message: string; // human-readable, already composed, e.g. "submitted the task for review"
  detail?: string; // optional extra line, e.g. rejection reason
}

export interface ReviewRequest {
  reviewerId: string;
  requestedById: string;
  message: string;
  deadline?: string; // ISO date
  requestedAt: string; // ISO date
}

export interface ReviewOutcome {
  outcome: "approved" | "changes_requested" | "rejected";
  reviewerId: string;
  reason?: string; // required for changes_requested / rejected
  decidedAt: string; // ISO date
}

export interface Task {
  id: string;
  reference: string; // e.g. "TSK-2026-0184"
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;

  assigneeId: string;
  creatorId: string;

  createdAt: string; // ISO date
  dueDate: string; // ISO date
  lastActivityAt: string; // ISO date

  relatedTo?: RelatedEntity;

  activity: ActivityEvent[];
  comments: Comment[];

  currentReviewRequest?: ReviewRequest;
  reviewHistory?: ReviewOutcome[];

  /** True until the assignee has opened the task at least once. */
  isUnopened?: boolean;
}

// Convenience view-model used by filters/tabs in the UI layer.
export type TaskView =
  | "my_tasks"
  | "assigned_by_me"
  | "created"
  | "submitted_for_review"
  | "waiting_for_my_review"
  | "rejected"
  | "completed"
  | "all";
