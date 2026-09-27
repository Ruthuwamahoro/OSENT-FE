import Link from "next/link";
import { MessageSquare, Activity, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RelationshipBadge } from "@/components/business-network/connection-badge";
import { CATEGORY_LABELS } from "@/components/business-network/meta";
import { BusinessEmptyState } from "@/components/business-network/empty-state";
import { formatRelative, initials } from "@/lib/utils";
import type { Business, CustomerRelation } from "@/utils/types/business";

export function CustomerTable({
  customers,
  businesses,
}: {
  customers: CustomerRelation[];
  businesses: Record<string, Business>;
}) {
  if (customers.length === 0) {
    return (
      <BusinessEmptyState
        icon={Users}
        title="You haven't added any customers"
        description="Businesses that buy from you will show up here once connected."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="hidden w-full text-sm md:table">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
            <th className="px-4 py-2.5 font-medium">Customer</th>
            <th className="px-3 py-2.5 font-medium">Location</th>
            <th className="px-3 py-2.5 font-medium">Total Transactions</th>
            <th className="px-3 py-2.5 font-medium">Last Transaction</th>
            <th className="px-3 py-2.5 font-medium">Last Activity</th>
            <th className="px-3 py-2.5 font-medium" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {customers.map((c) => {
            const business = businesses[c.businessId];
            if (!business) return null;
            return (
              <tr key={c.businessId} className="hover:bg-muted/30">
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
                <td className="px-3 py-3 text-muted-foreground">{business.location}</td>
                <td className="px-3 py-3 text-muted-foreground">{c.totalTransactions}</td>
                <td className="px-3 py-3 text-muted-foreground">
                  {c.lastTransactionAt ? formatRelative(c.lastTransactionAt) : "—"}
                </td>
                <td className="px-3 py-3 text-xs text-muted-foreground">{c.lastActivitySummary}</td>
                <td className="px-3 py-3">
                  <div className="flex justify-end gap-1.5">
                    <Button variant="outline" size="sm">
                      <Link href={`/business/messages/conv-${business.id}`}>
                        <MessageSquare className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Link href={`/business/${business.id}`}>
                        <Activity className="h-3.5 w-3.5" />
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
        {customers.map((c) => {
          const business = businesses[c.businessId];
          if (!business) return null;
          return (
            <li key={c.businessId} className="p-4">
              <div className="flex items-center justify-between gap-2">
                <Link href={`/business/${business.id}`} className="font-medium text-foreground hover:underline">
                  {business.name}
                </Link>
                <RelationshipBadge relationship={c.relationshipStatus} />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {CATEGORY_LABELS[business.category]} · {business.location}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {c.totalTransactions} transactions · {c.lastActivitySummary}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}