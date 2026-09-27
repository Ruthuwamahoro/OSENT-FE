import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "@/components/business-network/meta";
import { ConnectionStatusBadge } from "@/components/business-network/connection-badge";
import type { Business, Service } from "@/utils/types/business";

export function ServiceCard({ service, business }: { service: Service; business: Business }) {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-border p-4">
      <div>
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium leading-snug text-foreground">{service.name}</p>
          <ConnectionStatusBadge status={business.connectionStatus} />
        </div>
        <Link href={`/business/${business.id}`} className="mt-1 block text-xs text-muted-foreground hover:underline">
          {business.name}
        </Link>
        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{service.description}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{CATEGORY_LABELS[service.category]}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {service.location}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">{service.priceOnRequest ? "Request Quote" : service.startingPrice}</p>
        <Button size="sm" variant="outline">
          <Link href={`/business/${business.id}`}>View Service</Link>
        </Button>
      </div>
    </div>
  );
}