import Link from "next/link";
import { MapPin, Package } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ConnectionStatusBadge, VerificationBadge } from "@/components/business-network/connection-badge";
import { CATEGORY_LABELS } from "./meta";
import { initials } from "@/lib/utils";
import type { Business } from "@/utils/types/business";

interface BusinessCardProps {
  business: Business;
  onConnect: (id: string) => void;
  onRequestQuote: (id: string) => void;
}

export function BusinessCard({ business, onConnect, onRequestQuote }: BusinessCardProps) {
  const offerings = [...(business.productPreview ?? []), ...(business.servicePreview ?? [])].slice(0, 3);

  return (
    <div className="flex flex-col justify-between rounded-lg border border-border p-4">
      <div>
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 shrink-0 rounded-md">
            <AvatarFallback className="rounded-md">{initials(business.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <Link href={`/business/${business.id}`} className="block truncate text-sm font-medium text-foreground hover:underline">
              {business.name}
            </Link>
            <p className="mt-0.5 text-xs text-muted-foreground">{CATEGORY_LABELS[business.category]}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {business.location}
              </span>
              <VerificationBadge verified={business.verification === "verified"} />
            </div>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">{business.description}</p>

        {offerings.length > 0 && (
          <div className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
            <Package className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{offerings.join(" · ")}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <ConnectionStatusBadge status={business.connectionStatus} />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onRequestQuote(business.id)}>
            Request Quote
          </Button>
          {business.connectionStatus === "not_connected" && (
            <Button size="sm" onClick={() => onConnect(business.id)}>
              Connect
            </Button>
          )}
          {business.connectionStatus === "pending_sent" && (
            <Button size="sm" variant="secondary" disabled>
              Requested
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}