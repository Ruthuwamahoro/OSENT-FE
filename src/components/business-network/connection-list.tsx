import Link from "next/link";
import { MessageSquare, Activity, Check, X, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RelationshipBadge } from "@/components/business-network/connection-badge";
import { CATEGORY_LABELS } from "@/components/business-network/meta";
import { BusinessEmptyState } from "@/components/business-network/empty-state";
import { formatRelative, initials } from "@/lib/utils";
import type { Business, Connection } from "@/utils/types/business";

interface ConnectionListProps {
  connections: Connection[];
  businesses: Record<string, Business>;
  emptyTitle: string;
  emptyDescription: string;
  onAccept?: (businessId: string) => void;
  onDecline?: (businessId: string) => void;
  onCancelRequest?: (businessId: string) => void;
}

export function ConnectionList({
  connections,
  businesses,
  emptyTitle,
  emptyDescription,
  onAccept,
  onDecline,
  onCancelRequest,
}: ConnectionListProps) {
  if (connections.length === 0) {
    return <BusinessEmptyState icon={Users} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <ul className="divide-y divide-border rounded-lg border border-border">
      {connections.map((conn) => {
        const business = businesses[conn.businessId];
        if (!business) return null;

        return (
          <li key={conn.businessId} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <Avatar className="h-9 w-9 shrink-0 rounded-md">
                <AvatarFallback className="rounded-md">{initials(business.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <Link href={`/business/${business.id}`} className="truncate text-sm font-medium text-foreground hover:underline">
                  {business.name}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {CATEGORY_LABELS[business.category]} · {business.location}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{conn.lastActivitySummary}</p>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
              {conn.relationship && <RelationshipBadge relationship={conn.relationship} />}
              <span className="text-xs text-muted-foreground">{formatRelative(conn.lastActivityAt)}</span>

              {conn.status === "connected" && (
                <div className="flex gap-1.5">
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
              )}

              {conn.status === "pending_received" && (
                <div className="flex gap-1.5">
                  <Button size="sm" className="gap-1" onClick={() => onAccept?.(business.id)}>
                    <Check className="h-3.5 w-3.5" />
                    Accept
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => onDecline?.(business.id)}>
                    <X className="h-3.5 w-3.5" />
                    Decline
                  </Button>
                </div>
              )}

              {conn.status === "pending_sent" && (
                <Button variant="outline" size="sm" onClick={() => onCancelRequest?.(business.id)}>
                  Cancel Request
                </Button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}