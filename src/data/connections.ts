import type { Connection } from "@/utils/types/business";

// ---------------------------------------------------------------------------
// Mock data only. `getConnections()` stands in for a future
// `GET /api/business/connections` call — every connections-page component
// consumes the `Connection` type, not this file directly.
// ---------------------------------------------------------------------------

const now = new Date();
function daysAgo(n: number) {
  return new Date(now.getTime() - n * 86_400_000).toISOString();
}
function monthsAgo(n: number) {
  const d = new Date(now);
  d.setMonth(d.getMonth() - n);
  return d.toISOString();
}
function hoursAgo(n: number) {
  return new Date(now.getTime() - n * 3_600_000).toISOString();
}

export const connections: Connection[] = [
  {
    businessId: "b-01",
    status: "connected",
    relationship: "customer",
    connectedAt: monthsAgo(8),
    lastActivityAt: hoursAgo(6),
    lastActivitySummary: "Purchase Order PO-2026-0024 sent",
  },
  {
    businessId: "b-02",
    status: "connected",
    relationship: "supplier",
    connectedAt: monthsAgo(5),
    lastActivityAt: daysAgo(1),
    lastActivitySummary: "Invoice INV-2026-0041 received",
  },
  {
    businessId: "b-03",
    status: "connected",
    relationship: "partner",
    connectedAt: monthsAgo(3),
    lastActivityAt: daysAgo(4),
    lastActivitySummary: "Quotation request sent",
  },
  {
    businessId: "b-08",
    status: "connected",
    relationship: "connected",
    connectedAt: daysAgo(20),
    lastActivityAt: daysAgo(2),
    lastActivitySummary: "Connected 20 days ago",
  },
  {
    businessId: "b-04",
    status: "pending_sent",
    requestedAt: daysAgo(3),
    lastActivityAt: daysAgo(3),
    lastActivitySummary: "Connection request sent, awaiting response",
  },
  {
    businessId: "b-06",
    status: "pending_received",
    requestedAt: daysAgo(1),
    lastActivityAt: daysAgo(1),
    lastActivitySummary: "Wants to connect with your business",
  },
];

export function getConnections(): Connection[] {
  return connections;
}