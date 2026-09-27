import type { SupplierRelation } from "@/utils/types/business";

// ---------------------------------------------------------------------------
// Mock data only. `getSuppliers()` stands in for a future
// `GET /api/business/suppliers` call.
// ---------------------------------------------------------------------------

const now = new Date();
function daysAgo(n: number) {
  return new Date(now.getTime() - n * 86_400_000).toISOString();
}

export const suppliers: SupplierRelation[] = [
  {
    businessId: "b-02",
    relationshipStatus: "supplier",
    offerings: ["Packaging Materials", "Printed Cartons"],
    lastOrderAt: daysAgo(4),
    lastActivityAt: daysAgo(1),
    lastActivitySummary: "Invoice INV-2026-0041 received",
  },
  {
    businessId: "b-10",
    relationshipStatus: "supplier",
    offerings: ["Cement", "Timber", "Finishing Materials"],
    lastOrderAt: daysAgo(11),
    lastActivityAt: daysAgo(2),
    lastActivitySummary: "Delivery confirmed for PO-2026-0019",
  },
];

export function getSuppliers(): SupplierRelation[] {
  return suppliers;
}