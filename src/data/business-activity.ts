import type { BusinessActivityEvent } from "@/utils/types/business";

// ---------------------------------------------------------------------------
// Mock data only. `getBusinessActivity()` stands in for a future
// `GET /api/business/activity` call. `getActivityForBusiness(id)` powers the
// "Activity" section on an individual business profile.
// ---------------------------------------------------------------------------

const now = new Date();
function hoursAgo(n: number) {
  return new Date(now.getTime() - n * 3_600_000).toISOString();
}
function daysAgo(n: number) {
  return new Date(now.getTime() - n * 86_400_000).toISOString();
}
function monthsAgo(n: number) {
  const d = new Date(now);
  d.setMonth(d.getMonth() - n);
  return d.toISOString();
}

export const businessActivity: BusinessActivityEvent[] = [
  {
    id: "ba-01",
    kind: "purchase_order",
    businessId: "b-01",
    message: "Purchase Order PO-2026-0024 created.",
    createdAt: hoursAgo(6),
    relatedReference: "PO-2026-0024",
  },
  {
    id: "ba-02",
    kind: "message",
    businessId: "b-01",
    message: "New message received.",
    createdAt: hoursAgo(2),
  },
  {
    id: "ba-03",
    kind: "invoice",
    businessId: "b-02",
    message: "Invoice INV-2026-0041 received.",
    createdAt: daysAgo(1),
    relatedReference: "INV-2026-0041",
  },
  {
    id: "ba-04",
    kind: "quotation_sent",
    businessId: "b-03",
    message: "Quotation request sent.",
    createdAt: daysAgo(4),
  },
  {
    id: "ba-05",
    kind: "connection_requested",
    businessId: "b-06",
    message: "Sent a connection request to your business.",
    createdAt: daysAgo(1),
  },
  {
    id: "ba-06",
    kind: "connected",
    businessId: "b-08",
    message: "Connected 20 days ago.",
    createdAt: daysAgo(20),
  },
  {
    id: "ba-07",
    kind: "delivery",
    businessId: "b-10",
    message: "Delivery completed for PO-2026-0019.",
    createdAt: daysAgo(2),
    relatedReference: "PO-2026-0019",
  },
  {
    id: "ba-08",
    kind: "sales_order",
    businessId: "b-09",
    message: "Sales Order SO-2026-0072 received.",
    createdAt: daysAgo(3),
    relatedReference: "SO-2026-0072",
  },
  {
    id: "ba-09",
    kind: "quotation_received",
    businessId: "b-01",
    message: "Received a quotation for the requested items.",
    createdAt: daysAgo(2),
  },
  {
    id: "ba-10",
    kind: "profile_updated",
    businessId: "b-02",
    message: "Updated their business profile.",
    createdAt: daysAgo(9),
  },
  {
    id: "ba-11",
    kind: "connected",
    businessId: "b-03",
    message: "Connected 3 months ago.",
    createdAt: monthsAgo(3),
  },
  {
    id: "ba-12",
    kind: "invoice",
    businessId: "b-09",
    message: "Invoice INV-2026-0038 paid.",
    createdAt: daysAgo(3),
    relatedReference: "INV-2026-0038",
  },
  {
    id: "ba-13",
    kind: "message",
    businessId: "b-04",
    message: "New message received.",
    createdAt: hoursAgo(30),
  },
  {
    id: "ba-14",
    kind: "connected",
    businessId: "b-01",
    message: "Connected 8 months ago.",
    createdAt: monthsAgo(8),
  },
];

export function getBusinessActivity(): BusinessActivityEvent[] {
  return [...businessActivity].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getActivityForBusiness(businessId: string): BusinessActivityEvent[] {
  return getBusinessActivity().filter((e) => e.businessId === businessId);
}