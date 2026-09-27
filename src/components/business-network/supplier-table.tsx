import Link from "next/link";
import { MessageSquare, FileText, Truck } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RelationshipBadge } from "@/components/business-network/connection-badge";
import { CATEGORY_LABELS } from "@/components/business-network/meta";
import { BusinessEmptyState } from "@/components/business-network/empty-state";
import { formatRelative, initials } from "@/lib/utils";
import type { Business, SupplierRelation } from "@/utils/types/business";

export function SupplierTable({
  suppliers,
  businesses,
  onRequestQuote,
}: {
  suppliers: SupplierRelation[];
  businesses: Record<string, Business>;
  onRequestQuote: (businessId: string) => void;
}) {
  if (suppliers.length === 0) {
    return (
      <BusinessEmptyState
        icon={Truck}
        title="You don't have any suppliers yet"
        description="Businesses you buy from will show up here once connected."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="hidden w-full text-sm md:table">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
            <th className="px-4 py-2.5 font-medium">Supplier</th>
            <th className="px-3 py-2.5 font-medium">Products/Services</th>
            <th className="px-3 py-2.5 font-medium">Location</th>
            <th className="px-3 py-2.5 font-medium">Last Order</th>
            <th className="px-3 py-2.5 font-medium">Last Activity</th>
            <th className="px-3 py-2.5 font-medium" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {suppliers.map((s) => {
            const business = businesses[s.businessId];
            if (!business) return null;
            return (
              <tr key={s.businessId} className="hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-8 w-8 rounded-md">
                      <AvatarFallback className="rounded-md text-xs">{initials(business.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <Link href={`/business/${business.id}`} className="font-medium text-foreground hover:underline">
                        {business.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{CATEGORY_LABELS[business.category]}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-xs text-muted-foreground">{s.offerings.join(", ")}</td>
                <td className="px-3 py-3 text-muted-foreground">{business.location}</td>
                <td className="px-3 py-3 text-muted-foreground">{s.lastOrderAt ? formatRelative(s.lastOrderAt) : "—"}</td>
                <td className="px-3 py-3 text-xs text-muted-foreground">{s.lastActivitySummary}</td>
                <td className="px-3 py-3">
                  <div className="flex justify-end gap-1.5">
                    <Button variant="outline" size="sm" onClick={() => onRequestQuote(business.id)}>
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Link href={`/business/messages/conv-${business.id}`}>
                        <MessageSquare className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ul className="divide-y divide-border md:hidden">
        {suppliers.map((s) => {
          const business = businesses[s.businessId];
          if (!business) return null;
          return (
            <li key={s.businessId} className="p-4">
              <div className="flex items-center justify-between gap-2">
                <Link href={`/business/${business.id}`} className="font-medium text-foreground hover:underline">
                  {business.name}
                </Link>
                <RelationshipBadge relationship={s.relationshipStatus} />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {CATEGORY_LABELS[business.category]} · {business.location}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{s.offerings.join(", ")}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.lastActivitySummary}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}