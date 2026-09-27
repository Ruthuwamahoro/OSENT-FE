import type { CustomerRelation } from "@/utils/types/business";

// ---------------------------------------------------------------------------
// Mock data only. `getCustomers()` stands in for a future
// `GET /api/business/customers` call.
// ---------------------------------------------------------------------------

const now = new Date();
function daysAgo(n: number) {
  return new Date(now.getTime() - n * 86_400_000).toISOString();
}

export const customers: CustomerRelation[] = [
  {
    businessId: "b-01",
    relationshipStatus: "customer",
    lastTransactionAt: daysAgo(6),
    totalTransactions: 18,
    lastActivityAt: daysAgo(1),
    lastActivitySummary: "Purchase Order PO-2026-0024 sent",
  },
  {
    businessId: "b-09",
    relationshipStatus: "customer",
    lastTransactionAt: daysAgo(14),
    totalTransactions: 7,
    lastActivityAt: daysAgo(3),
    lastActivitySummary: "Invoice INV-2026-0038 paid",
  },
];

export function getCustomers(): CustomerRelation[] {
  return customers;
}