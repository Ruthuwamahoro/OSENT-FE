import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock3, Link2, ShieldCheck,Handshake, ShoppingCart, Truck, Users } from "lucide-react";
import type { ComponentType } from "react";


type ConnectionStatus =
  | "connected"
  | "pending_sent"
  | "pending_received"
  | "not_connected";

type Relationship =
  | "customer"
  | "supplier"
  | "partner"
  | "connected";

interface ConnectionStatusBadgeProps {
  status: ConnectionStatus;
}
interface RelationshipBadgeProps {
    relationship: Relationship;
  }
const CONNECTION_STATUS: Record<
  ConnectionStatus,
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  connected: {
    label: "Connected",
    variant: "secondary",
    icon: CheckCircle2,
  },
  pending_sent: {
    label: "Request Sent",
    variant: "outline",
    icon: Clock3,
  },
  pending_received: {
    label: "Request Received",
    variant: "outline",
    icon: Clock3,
  },
  not_connected: {
    label: "Not Connected",
    variant: "outline",
    icon: Link2,
  },
};
const RELATIONSHIPS: Record<
  Relationship,
  {
    label: string;
    icon: ComponentType<{ className?: string }>;
  }
> = {
  customer: {
    label: "Customer",
    icon: ShoppingCart,
  },
  supplier: {
    label: "Supplier",
    icon: Truck,
  },
  partner: {
    label: "Partner",
    icon: Handshake,
  },
  connected: {
    label: "Connected",
    icon: Users,
  },
};

export function RelationshipBadge({
    relationship,
  }: RelationshipBadgeProps) {
    const config = RELATIONSHIPS[relationship];
  
    if (!config) return null;
  
    const Icon = config.icon;
  
    return (
      <Badge variant="secondary" className="gap-1.5">
        <Icon className="h-3.5 w-3.5" />
        {config.label}
      </Badge>
    );
  }
export function ConnectionStatusBadge({
  status,
}: ConnectionStatusBadgeProps) {
  const config = CONNECTION_STATUS[status];

  if (!config) return null;

  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="gap-1.5">
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </Badge>
  );
}

interface VerificationBadgeProps {
  verified?: boolean;
}

export function VerificationBadge({
  verified = false,
}: VerificationBadgeProps) {
  if (!verified) return null;

  return (
    <Badge
      variant="secondary"
      className="gap-1.5"
      title="Verified business"
    >
      <ShieldCheck className="h-3.5 w-3.5" />
      Verified
    </Badge>
  );
}