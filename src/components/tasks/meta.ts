import type { VariantProps } from "class-variance-authority";
import type { TaskPriority, TaskStatus, TaskType, RelatedEntityType } from "@/utils/types/task";
import { badgeVariants } from "@/components/ui/badge";

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

export const STATUS_META: Record<
  TaskStatus,
  { label: string; badge: BadgeVariant; dot: string }
> = {
  new: { label: "New", badge: "outline", dot: "bg-muted-foreground" },
  in_progress: { label: "In Progress", badge: "default", dot: "bg-primary" },
  pending: { label: "Pending", badge: "muted", dot: "bg-muted-foreground" },
  awaiting_review: { label: "Awaiting Review", badge: "warning", dot: "bg-warning" },
  changes_requested: { label: "Changes Requested", badge: "warning", dot: "bg-warning" },
  rejected: { label: "Rejected", badge: "destructive", dot: "bg-destructive" },
  completed: { label: "Completed", badge: "success", dot: "bg-success" },
  cancelled: { label: "Cancelled", badge: "muted", dot: "bg-muted-foreground" },
};

// Overdue is derived (see lib/utils isOverdue), not a stored status — but it
// needs its own display treatment wherever it overrides the stored status.
export const OVERDUE_META = { label: "Overdue", badge: "destructive" as const, dot: "bg-destructive" };

export const PRIORITY_META: Record<TaskPriority, { label: string; color: string }> = {
  low: { label: "Low", color: "text-muted-foreground" },
  medium: { label: "Medium", color: "text-foreground" },
  high: { label: "High", color: "text-warning" },
  urgent: { label: "Urgent", color: "text-destructive" },
};

export const TYPE_LABELS: Record<TaskType, string> = {
  general: "General",
  sales: "Sales",
  customer: "Customer",
  supplier: "Supplier",
  procurement: "Procurement",
  inventory: "Inventory",
  document: "Document",
  finance: "Finance",
  delivery: "Delivery",
  review: "Review",
  "follow-up": "Follow-up",
  administrative: "Administrative",
};

export const RELATED_TYPE_LABELS: Record<RelatedEntityType, string> = {
  customer: "Customer",
  supplier: "Supplier",
  invoice: "Invoice",
  purchase_order: "Purchase Order",
  proforma_invoice: "Proforma Invoice",
  proforma_request: "Proforma Request",
  delivery_note: "Delivery Note",
  sales_order: "Sales Order",
  inventory_item: "Inventory Item",
  procurement_request: "Procurement Request",
};
