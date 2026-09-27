import type { Task } from "@/utils/types/task";
import { CURRENT_USER_ID } from "@/data/users";

// ---------------------------------------------------------------------------
// Mock data only. This file stands in for real OSENT API responses.
// Replace `getTasks()` with a fetch to your backend and everything else
// in the UI (components/tasks/*) keeps working unchanged, since every
// component consumes the `Task` type, not this file directly.
// ---------------------------------------------------------------------------

const now = new Date();

function minutesAgo(n: number) {
  return new Date(now.getTime() - n * 60_000).toISOString();
}
function hoursAgo(n: number) {
  return new Date(now.getTime() - n * 3_600_000).toISOString();
}
function daysAgo(n: number) {
  return new Date(now.getTime() - n * 86_400_000).toISOString();
}
function daysFromNow(n: number) {
  return new Date(now.getTime() + n * 86_400_000).toISOString();
}
function today(hour: number, minute = 0) {
  const d = new Date(now);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export const tasks: Task[] = [
  // ---- Hero example: in progress, high priority, due today -------------
  {
    id: "t-0184",
    reference: "TSK-2026-0184",
    title: "Prepare Proforma Invoice for Kigali Hardware",
    description:
      "Prepare a proforma invoice for Kigali Hardware based on the customer's request and send it to the sales manager for review.",
    type: "document",
    status: "in_progress",
    priority: "high",
    assigneeId: "u-jean",
    creatorId: "u-marie",
    createdAt: daysAgo(1),
    dueDate: today(17, 0),
    lastActivityAt: minutesAgo(11),
    relatedTo: {
      type: "proforma_request",
      id: "PR-2026-0042",
      label: "Proforma Request PR-2026-0042",
      customer: "Kigali Hardware Ltd",
      amount: "RWF 2,450,000",
      itemCount: 12,
    },
    activity: [
      { id: "a1", kind: "created", actorId: "u-marie", createdAt: daysAgo(1), message: "created this task." },
      { id: "a2", kind: "assigned", actorId: "u-marie", createdAt: today(9, 15), message: "assigned this task to Jean." },
      { id: "a3", kind: "commented", actorId: "u-marie", createdAt: today(9, 40), message: "commented." },
      { id: "a4", kind: "commented", actorId: "u-jean", createdAt: minutesAgo(11), message: "replied." },
    ],
    comments: [
      {
        id: "c1",
        authorId: "u-marie",
        body: "Please check the quantity for item #4 before submitting.",
        createdAt: today(9, 40),
      },
      {
        id: "c2",
        authorId: "u-jean",
        body: "I've updated it. The supplier confirmed the quantity.",
        createdAt: minutesAgo(11),
      },
    ],
  },

  // ---- Newly assigned, unopened -----------------------------------------
  {
    id: "t-0201",
    reference: "TSK-2026-0201",
    title: "Prepare Delivery Note for ABC Traders",
    description:
      "Prepare the delivery note for the confirmed order and hand it to the driver before dispatch.",
    type: "delivery",
    status: "new",
    priority: "medium",
    assigneeId: "u-jean",
    creatorId: "u-marie",
    createdAt: minutesAgo(15),
    dueDate: daysFromNow(1),
    lastActivityAt: minutesAgo(15),
    isUnopened: true,
    relatedTo: {
      type: "sales_order",
      id: "SO-2026-0098",
      label: "Sales Order SO-2026-0098",
      customer: "ABC Traders Ltd",
    },
    activity: [
      { id: "a1", kind: "created", actorId: "u-marie", createdAt: minutesAgo(15), message: "created this task." },
      { id: "a2", kind: "assigned", actorId: "u-marie", createdAt: minutesAgo(15), message: "assigned this task to Jean." },
    ],
    comments: [],
  },
  {
    id: "t-0202",
    reference: "TSK-2026-0202",
    title: "Contact supplier about delayed shipment",
    description:
      "Green Valley Traders' shipment is two days late. Call the supplier, get a new delivery estimate, and update the purchase order notes.",
    type: "supplier",
    status: "new",
    priority: "high",
    assigneeId: "u-jean",
    creatorId: "u-emmanuel",
    createdAt: hoursAgo(2),
    dueDate: today(16, 0),
    lastActivityAt: hoursAgo(2),
    isUnopened: true,
    relatedTo: {
      type: "purchase_order",
      id: "PO-2026-0117",
      label: "Purchase Order PO-2026-0117",
      customer: "Green Valley Traders",
    },
    activity: [
      { id: "a1", kind: "created", actorId: "u-emmanuel", createdAt: hoursAgo(2), message: "created this task." },
      { id: "a2", kind: "assigned", actorId: "u-emmanuel", createdAt: hoursAgo(2), message: "assigned this task to Jean." },
    ],
    comments: [],
  },

  // ---- Overdue ------------------------------------------------------------
  {
    id: "t-0150",
    reference: "TSK-2026-0150",
    title: "Follow up on delayed delivery to Amahoro Retail",
    description:
      "Amahoro Retail has not received their order confirmation. Call the customer, confirm the delivery window, and log the outcome.",
    type: "follow-up",
    status: "in_progress",
    priority: "urgent",
    assigneeId: "u-jean",
    creatorId: "u-alice",
    createdAt: daysAgo(4),
    dueDate: daysAgo(2),
    lastActivityAt: daysAgo(2),
    relatedTo: {
      type: "sales_order",
      id: "SO-2026-0071",
      label: "Sales Order SO-2026-0071",
      customer: "Amahoro Retail",
    },
    activity: [
      { id: "a1", kind: "created", actorId: "u-alice", createdAt: daysAgo(4), message: "created this task." },
      { id: "a2", kind: "assigned", actorId: "u-alice", createdAt: daysAgo(4), message: "assigned this task to Jean." },
      { id: "a3", kind: "commented", actorId: "u-alice", createdAt: daysAgo(2), message: "commented." },
    ],
    comments: [
      {
        id: "c1",
        authorId: "u-alice",
        body: "The customer called again this morning — please prioritize this one.",
        createdAt: daysAgo(2),
      },
    ],
  },
  {
    id: "t-0151",
    reference: "TSK-2026-0151",
    title: "Update inventory after receiving goods",
    description:
      "Goods from Umucyo Supplies arrived at the main warehouse. Count the items against the delivery note and update the inventory records.",
    type: "inventory",
    status: "pending",
    priority: "high",
    assigneeId: "u-jean",
    creatorId: "u-patrick",
    createdAt: daysAgo(3),
    dueDate: daysAgo(1),
    lastActivityAt: daysAgo(1),
    relatedTo: {
      type: "delivery_note",
      id: "DN-2026-0063",
      label: "Delivery Note DN-2026-0063",
      customer: "Umucyo Supplies",
      itemCount: 34,
    },
    activity: [
      { id: "a1", kind: "created", actorId: "u-patrick", createdAt: daysAgo(3), message: "created this task." },
      { id: "a2", kind: "assigned", actorId: "u-patrick", createdAt: daysAgo(3), message: "assigned this task to Jean." },
      { id: "a3", kind: "status_changed", actorId: "u-jean", createdAt: daysAgo(1), message: "marked this task as pending." },
    ],
    comments: [],
  },

  // ---- Awaiting review: submitted by me (Jean) ---------------------------
  {
    id: "t-0160",
    reference: "TSK-2026-0160",
    title: "Prepare Purchase Order for Bright Rwanda Ltd",
    description:
      "Create the purchase order for the approved procurement request and route it for review before sending to the supplier.",
    type: "procurement",
    status: "awaiting_review",
    priority: "medium",
    assigneeId: "u-jean",
    creatorId: "u-jean",
    createdAt: daysAgo(2),
    dueDate: daysFromNow(1),
    lastActivityAt: hoursAgo(3),
    relatedTo: {
      type: "procurement_request",
      id: "PROC-2026-0028",
      label: "Procurement Request PROC-2026-0028",
      customer: "Bright Rwanda Ltd",
      amount: "RWF 1,180,000",
    },
    currentReviewRequest: {
      reviewerId: "u-marie",
      requestedById: "u-jean",
      message: "Could you please review the quantities and prices before I send this to the supplier?",
      requestedAt: hoursAgo(3),
    },
    activity: [
      { id: "a1", kind: "created", actorId: "u-jean", createdAt: daysAgo(2), message: "created this task." },
      { id: "a2", kind: "submitted_for_review", actorId: "u-jean", createdAt: hoursAgo(3), message: "submitted the task for review." },
    ],
    comments: [],
  },

  // ---- Waiting for my review (Jean is reviewer) --------------------------
  {
    id: "t-0161",
    reference: "TSK-2026-0161",
    title: "Verify invoice INV-2026-0012",
    description:
      "Diane has prepared the invoice for Imboni Distribution. Verify the line items and totals before it goes out.",
    type: "finance",
    status: "awaiting_review",
    priority: "medium",
    assigneeId: "u-diane",
    creatorId: "u-diane",
    createdAt: daysAgo(1),
    dueDate: daysFromNow(1),
    lastActivityAt: hoursAgo(5),
    relatedTo: {
      type: "invoice",
      id: "INV-2026-0012",
      label: "Invoice INV-2026-0012",
      customer: "Imboni Distribution",
      amount: "RWF 860,000",
    },
    currentReviewRequest: {
      reviewerId: "u-jean",
      requestedById: "u-diane",
      message: "Can you check the tax lines look right before this goes to the customer?",
      requestedAt: hoursAgo(5),
    },
    activity: [
      { id: "a1", kind: "created", actorId: "u-diane", createdAt: daysAgo(1), message: "created this task." },
      { id: "a2", kind: "submitted_for_review", actorId: "u-diane", createdAt: hoursAgo(5), message: "submitted the task for review." },
    ],
    comments: [],
  },
  {
    id: "t-0162",
    reference: "TSK-2026-0162",
    title: "Review sales order for Green Valley Traders",
    description:
      "Emmanuel drafted the sales order after the customer call. Review it against the quoted prices before confirmation.",
    type: "sales",
    status: "awaiting_review",
    priority: "high",
    assigneeId: "u-emmanuel",
    creatorId: "u-emmanuel",
    createdAt: hoursAgo(9),
    dueDate: today(18, 0),
    lastActivityAt: hoursAgo(1),
    relatedTo: {
      type: "sales_order",
      id: "SO-2026-0104",
      label: "Sales Order SO-2026-0104",
      customer: "Green Valley Traders",
      amount: "RWF 3,120,000",
    },
    currentReviewRequest: {
      reviewerId: "u-jean",
      requestedById: "u-emmanuel",
      message: "This is a bigger order than usual — could you double check the pricing tier?",
      requestedAt: hoursAgo(1),
    },
    activity: [
      { id: "a1", kind: "created", actorId: "u-emmanuel", createdAt: hoursAgo(9), message: "created this task." },
      { id: "a2", kind: "submitted_for_review", actorId: "u-emmanuel", createdAt: hoursAgo(1), message: "submitted the task for review." },
    ],
    comments: [],
  },

  // ---- Rejected -----------------------------------------------------------
  {
    id: "t-0140",
    reference: "TSK-2026-0140",
    title: "Prepare business letter for Umucyo Supplies",
    description:
      "Draft a formal letter to Umucyo Supplies regarding the revised payment terms discussed last week.",
    type: "document",
    status: "rejected",
    priority: "low",
    assigneeId: "u-jean",
    creatorId: "u-jean",
    createdAt: daysAgo(3),
    dueDate: daysAgo(1),
    lastActivityAt: daysAgo(1),
    relatedTo: {
      type: "supplier",
      id: "SUP-0009",
      label: "Supplier profile — Umucyo Supplies",
      customer: "Umucyo Supplies",
    },
    reviewHistory: [
      {
        outcome: "rejected",
        reviewerId: "u-marie",
        reason: "The attached document does not match the customer's request. Please redo it using the terms from the meeting notes.",
        decidedAt: daysAgo(1),
      },
    ],
    activity: [
      { id: "a1", kind: "created", actorId: "u-jean", createdAt: daysAgo(3), message: "created this task." },
      { id: "a2", kind: "submitted_for_review", actorId: "u-jean", createdAt: daysAgo(2), message: "submitted the task for review." },
      {
        id: "a3",
        kind: "rejected",
        actorId: "u-marie",
        createdAt: daysAgo(1),
        message: "rejected this task.",
        detail: "The attached document does not match the customer's request. Please redo it using the terms from the meeting notes.",
      },
    ],
    comments: [],
  },
  {
    id: "t-0141",
    reference: "TSK-2026-0141",
    title: "Prepare tender document for municipal contract",
    description:
      "Compile the tender document for the road-materials supply contract, including pricing schedule and company certificates.",
    type: "document",
    status: "rejected",
    priority: "high",
    assigneeId: "u-jean",
    creatorId: "u-jean",
    createdAt: daysAgo(5),
    dueDate: daysAgo(2),
    lastActivityAt: hoursAgo(6),
    relatedTo: {
      type: "procurement_request",
      id: "PROC-2026-0019",
      label: "Procurement Request PROC-2026-0019",
    },
    reviewHistory: [
      {
        outcome: "rejected",
        reviewerId: "u-marie",
        reason: "Missing the updated tax clearance certificate. Please attach it and resubmit.",
        decidedAt: hoursAgo(6),
      },
    ],
    activity: [
      { id: "a1", kind: "created", actorId: "u-jean", createdAt: daysAgo(5), message: "created this task." },
      { id: "a2", kind: "submitted_for_review", actorId: "u-jean", createdAt: daysAgo(1), message: "submitted the task for review." },
      {
        id: "a3",
        kind: "rejected",
        actorId: "u-marie",
        createdAt: hoursAgo(6),
        message: "rejected this task.",
        detail: "Missing the updated tax clearance certificate. Please attach it and resubmit.",
      },
    ],
    comments: [],
  },

  // ---- Changes requested ----------------------------------------------
  {
    id: "t-0170",
    reference: "TSK-2026-0170",
    title: "Prepare Purchase Order PO-2026-00124",
    description:
      "Create the purchase order for the confirmed procurement request and send it to the supplier for confirmation.",
    type: "procurement",
    status: "changes_requested",
    priority: "medium",
    assigneeId: "u-jean",
    creatorId: "u-jean",
    createdAt: daysAgo(2),
    dueDate: today(15, 0),
    lastActivityAt: hoursAgo(4),
    relatedTo: {
      type: "purchase_order",
      id: "PO-2026-00124",
      label: "Purchase Order PO-2026-00124",
      customer: "Bright Rwanda Ltd",
    },
    reviewHistory: [
      {
        outcome: "changes_requested",
        reviewerId: "u-marie",
        reason: "Please correct the supplier name and update the delivery date.",
        decidedAt: hoursAgo(4),
      },
    ],
    activity: [
      { id: "a1", kind: "created", actorId: "u-jean", createdAt: daysAgo(2), message: "created this task." },
      { id: "a2", kind: "submitted_for_review", actorId: "u-jean", createdAt: daysAgo(1), message: "submitted the task for review." },
      {
        id: "a3",
        kind: "changes_requested",
        actorId: "u-marie",
        createdAt: hoursAgo(4),
        message: "requested changes.",
        detail: "Please correct the supplier name and update the delivery date.",
      },
    ],
    comments: [],
  },
  {
    id: "t-0171",
    reference: "TSK-2026-0171",
    title: "Update customer information for Kigali Hardware",
    description:
      "Update the billing contact and delivery address on file after the customer's request last week.",
    type: "customer",
    status: "changes_requested",
    priority: "low",
    assigneeId: "u-jean",
    creatorId: "u-alice",
    createdAt: daysAgo(4),
    dueDate: daysFromNow(2),
    lastActivityAt: daysAgo(1),
    relatedTo: {
      type: "customer",
      id: "CUST-0004",
      label: "Customer profile — Kigali Hardware Ltd",
      customer: "Kigali Hardware Ltd",
    },
    reviewHistory: [
      {
        outcome: "changes_requested",
        reviewerId: "u-alice",
        reason: "The new delivery address looks incomplete — please confirm the sector and cell.",
        decidedAt: daysAgo(1),
      },
    ],
    activity: [
      { id: "a1", kind: "created", actorId: "u-alice", createdAt: daysAgo(4), message: "created this task." },
      { id: "a2", kind: "submitted_for_review", actorId: "u-jean", createdAt: daysAgo(2), message: "submitted the task for review." },
      {
        id: "a3",
        kind: "changes_requested",
        actorId: "u-alice",
        createdAt: daysAgo(1),
        message: "requested changes.",
        detail: "The new delivery address looks incomplete — please confirm the sector and cell.",
      },
    ],
    comments: [],
  },

  // ---- Completed ----------------------------------------------------------
  {
    id: "t-0120",
    reference: "TSK-2026-0120",
    title: "Confirm delivery for Amahoro Retail",
    description: "Call the customer to confirm the delivery was received in good condition.",
    type: "delivery",
    status: "completed",
    priority: "low",
    assigneeId: "u-jean",
    creatorId: "u-marie",
    createdAt: daysAgo(6),
    dueDate: daysAgo(5),
    lastActivityAt: daysAgo(5),
    relatedTo: {
      type: "delivery_note",
      id: "DN-2026-0050",
      label: "Delivery Note DN-2026-0050",
      customer: "Amahoro Retail",
    },
    activity: [
      { id: "a1", kind: "created", actorId: "u-marie", createdAt: daysAgo(6), message: "created this task." },
      { id: "a2", kind: "completed", actorId: "u-jean", createdAt: daysAgo(5), message: "marked this task as complete." },
    ],
    comments: [],
  },
  {
    id: "t-0121",
    reference: "TSK-2026-0121",
    title: "Financial reconciliation — August supplier payments",
    description: "Reconcile supplier payments against bank statements for August and flag any discrepancies.",
    type: "finance",
    status: "completed",
    priority: "medium",
    assigneeId: "u-diane",
    creatorId: "u-marie",
    createdAt: daysAgo(10),
    dueDate: daysAgo(7),
    lastActivityAt: daysAgo(7),
    activity: [
      { id: "a1", kind: "created", actorId: "u-marie", createdAt: daysAgo(10), message: "created this task." },
      { id: "a2", kind: "completed", actorId: "u-diane", createdAt: daysAgo(7), message: "marked this task as complete." },
    ],
    comments: [],
  },
  {
    id: "t-0122",
    reference: "TSK-2026-0122",
    title: "Approve Purchase Order PO-2026-0110",
    description: "Final approval for the purchase order after supplier confirmation.",
    type: "procurement",
    status: "completed",
    priority: "medium",
    assigneeId: "u-marie",
    creatorId: "u-emmanuel",
    createdAt: daysAgo(4),
    dueDate: daysAgo(3),
    lastActivityAt: daysAgo(3),
    relatedTo: {
      type: "purchase_order",
      id: "PO-2026-0110",
      label: "Purchase Order PO-2026-0110",
      customer: "Green Valley Traders",
    },
    reviewHistory: [
      { outcome: "approved", reviewerId: "u-marie", decidedAt: daysAgo(3) },
    ],
    activity: [
      { id: "a1", kind: "created", actorId: "u-emmanuel", createdAt: daysAgo(4), message: "created this task." },
      { id: "a2", kind: "approved", actorId: "u-marie", createdAt: daysAgo(3), message: "approved this task." },
    ],
    comments: [],
  },

  // ---- Urgent priority ------------------------------------------------
  {
    id: "t-0210",
    reference: "TSK-2026-0210",
    title: "Resolve pricing discrepancy before customer meeting",
    description:
      "The quote sent to Bright Rwanda Ltd doesn't match the current price list. Fix it before the 3pm meeting.",
    type: "sales",
    status: "in_progress",
    priority: "urgent",
    assigneeId: "u-jean",
    creatorId: "u-marie",
    createdAt: hoursAgo(3),
    dueDate: today(15, 0),
    lastActivityAt: hoursAgo(1),
    relatedTo: {
      type: "sales_order",
      id: "SO-2026-0109",
      label: "Sales Order SO-2026-0109",
      customer: "Bright Rwanda Ltd",
    },
    activity: [
      { id: "a1", kind: "created", actorId: "u-marie", createdAt: hoursAgo(3), message: "created this task." },
      { id: "a2", kind: "assigned", actorId: "u-marie", createdAt: hoursAgo(3), message: "assigned this task to Jean." },
    ],
    comments: [],
  },
  {
    id: "t-0211",
    reference: "TSK-2026-0211",
    title: "Reissue rejected invoice before month close",
    description: "Finance flagged an error on the VAT line. Reissue the corrected invoice today.",
    type: "finance",
    status: "in_progress",
    priority: "urgent",
    assigneeId: "u-diane",
    creatorId: "u-diane",
    createdAt: hoursAgo(5),
    dueDate: today(17, 30),
    lastActivityAt: hoursAgo(2),
    relatedTo: {
      type: "invoice",
      id: "INV-2026-0009",
      label: "Invoice INV-2026-0009",
      customer: "Imboni Distribution",
    },
    activity: [
      { id: "a1", kind: "created", actorId: "u-diane", createdAt: hoursAgo(5), message: "created this task." },
    ],
    comments: [],
  },

  // ---- More "my tasks" variety, general/admin -----------------------
  {
    id: "t-0220",
    reference: "TSK-2026-0220",
    title: "Submit weekly sales summary",
    description: "Compile this week's sales figures by customer and send the summary to the operations manager.",
    type: "administrative",
    status: "pending",
    priority: "low",
    assigneeId: "u-jean",
    creatorId: "u-jean",
    createdAt: daysAgo(1),
    dueDate: daysFromNow(3),
    lastActivityAt: daysAgo(1),
    activity: [
      { id: "a1", kind: "created", actorId: "u-jean", createdAt: daysAgo(1), message: "created this task." },
    ],
    comments: [],
  },
  {
    id: "t-0221",
    reference: "TSK-2026-0221",
    title: "Review procurement request from warehouse",
    description: "Patrick submitted a request for packaging materials. Review the quantities against current stock before approving.",
    type: "procurement",
    status: "in_progress",
    priority: "medium",
    assigneeId: "u-jean",
    creatorId: "u-patrick",
    createdAt: daysAgo(1),
    dueDate: daysFromNow(1),
    lastActivityAt: hoursAgo(7),
    relatedTo: {
      type: "procurement_request",
      id: "PROC-2026-0031",
      label: "Procurement Request PROC-2026-0031",
    },
    activity: [
      { id: "a1", kind: "created", actorId: "u-patrick", createdAt: daysAgo(1), message: "created this task." },
      { id: "a2", kind: "assigned", actorId: "u-patrick", createdAt: daysAgo(1), message: "assigned this task to Jean." },
    ],
    comments: [],
  },

  // ---- Assigned by me (Jean is creator, someone else is assignee) ----
  {
    id: "t-0230",
    reference: "TSK-2026-0230",
    title: "Contact Imboni Distribution about outstanding balance",
    description: "Follow up on the overdue balance and get a commitment date for payment.",
    type: "customer",
    status: "new",
    priority: "medium",
    assigneeId: "u-alice",
    creatorId: "u-jean",
    createdAt: hoursAgo(4),
    dueDate: daysFromNow(2),
    lastActivityAt: hoursAgo(4),
    relatedTo: {
      type: "customer",
      id: "CUST-0011",
      label: "Customer profile — Imboni Distribution",
      customer: "Imboni Distribution",
    },
    activity: [
      { id: "a1", kind: "created", actorId: "u-jean", createdAt: hoursAgo(4), message: "created this task." },
      { id: "a2", kind: "assigned", actorId: "u-jean", createdAt: hoursAgo(4), message: "assigned this task to Alice." },
    ],
    comments: [],
  },
  {
    id: "t-0231",
    reference: "TSK-2026-0231",
    title: "Count inventory for hardware section",
    description: "Do a spot count of the hardware section against the system records ahead of the audit.",
    type: "inventory",
    status: "in_progress",
    priority: "medium",
    assigneeId: "u-patrick",
    creatorId: "u-jean",
    createdAt: daysAgo(2),
    dueDate: daysFromNow(1),
    lastActivityAt: daysAgo(1),
    relatedTo: {
      type: "inventory_item",
      id: "INV-ITEM-HW",
      label: "Inventory — Hardware section",
    },
    activity: [
      { id: "a1", kind: "created", actorId: "u-jean", createdAt: daysAgo(2), message: "created this task." },
      { id: "a2", kind: "assigned", actorId: "u-jean", createdAt: daysAgo(2), message: "assigned this task to Patrick." },
    ],
    comments: [],
  },

  // ---- Cancelled ------------------------------------------------------
  {
    id: "t-0100",
    reference: "TSK-2026-0100",
    title: "Prepare tender document for cancelled contract",
    description: "The municipal contract bidding was cancelled before submission.",
    type: "document",
    status: "cancelled",
    priority: "low",
    assigneeId: "u-jean",
    creatorId: "u-marie",
    createdAt: daysAgo(12),
    dueDate: daysAgo(8),
    lastActivityAt: daysAgo(8),
    activity: [
      { id: "a1", kind: "created", actorId: "u-marie", createdAt: daysAgo(12), message: "created this task." },
      { id: "a2", kind: "cancelled", actorId: "u-marie", createdAt: daysAgo(8), message: "cancelled this task." },
    ],
    comments: [],
  },

  // ---- Recently created (not yet due soon) ----------------------------
  {
    id: "t-0240",
    reference: "TSK-2026-0240",
    title: "Prepare quarterly supplier performance review",
    description: "Summarize on-time delivery and quality issues for our top five suppliers this quarter.",
    type: "supplier",
    status: "new",
    priority: "low",
    assigneeId: "u-emmanuel",
    creatorId: "u-marie",
    createdAt: hoursAgo(1),
    dueDate: daysFromNow(10),
    lastActivityAt: hoursAgo(1),
    activity: [
      { id: "a1", kind: "created", actorId: "u-marie", createdAt: hoursAgo(1), message: "created this task." },
      { id: "a2", kind: "assigned", actorId: "u-marie", createdAt: hoursAgo(1), message: "assigned this task to Emmanuel." },
    ],
    comments: [],
  },
];

export function getTasks(): Task[] {
  return tasks;
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function getCurrentUserId(): string {
  return CURRENT_USER_ID;
}
