import Link from "next/link";
import {
  FileText,
  Handshake,
  Send,
  Inbox,
  ShoppingCart,
  Receipt,
  Truck,
  Pencil,
  MessageSquare,
  Circle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatRelative, initials } from "@/lib/utils";
import type { Business, BusinessActivityEvent, BusinessActivityKind } from "@/utils/types/business";
import { BusinessEmptyState } from "@/components/business-network/empty-state";
import { Activity } from "lucide-react";

const ICONS: Record<BusinessActivityKind, typeof Circle> = {
  connected: Handshake,
  connection_requested: Handshake,
  quotation_sent: Send,
  quotation_received: Inbox,
  purchase_order: ShoppingCart,
  sales_order: ShoppingCart,
  invoice: Receipt,
  delivery: Truck,
  profile_updated: Pencil,
  message: MessageSquare,
};

interface ActivityFeedProps {
  activity: BusinessActivityEvent[];
  businesses: Record<string, Business>;
  showBusinessName?: boolean;
}

export function ActivityFeed({ activity, businesses, showBusinessName = true }: ActivityFeedProps) {
  if (activity.length === 0) {
    return (
      <BusinessEmptyState
        icon={Activity}
        title="No activity yet"
        description="Relationship activity with businesses in your network will show up here."
      />
    );
  }

  return (
    <ol className="space-y-4">
      {activity.map((event) => {
        const Icon = ICONS[event.kind] ?? Circle;
        const business = businesses[event.businessId];

        return (
          <li key={event.id} className="flex gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1 pb-0.5">
              <p className="text-sm text-foreground">
                {showBusinessName && business && (
                  <>
                    <Link href={`/business/${business.id}`} className="font-medium hover:underline">
                      {business.name}
                    </Link>{" "}
                  </>
                )}
                {event.message}
              </p>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatRelative(event.createdAt)}</span>
                {event.relatedReference && (
                  <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">{event.relatedReference}</span>
                )}
              </div>
            </div>
            {showBusinessName && business && (
              <Avatar className="hidden h-6 w-6 shrink-0 rounded-md sm:flex">
                <AvatarFallback className="rounded-md text-[9px]">{initials(business.name)}</AvatarFallback>
              </Avatar>
            )}
          </li>
        );
      })}
    </ol>
  );
}