import type {
    BusinessCategory,
    BusinessLocation,
    ConnectionStatus,
    RelationshipType,
    Availability,
  } from "@/utils/types/business";
  import type { BadgeProps } from "@/components/ui/badge";
  
  export const CATEGORY_LABELS: Record<BusinessCategory, string> = {
    wholesale: "Wholesale",
    retail: "Retail",
    manufacturing: "Manufacturing",
    agriculture: "Agriculture",
    construction: "Construction",
    technology: "Technology",
    logistics: "Logistics",
    professional_services: "Professional Services",
    hospitality: "Hospitality",
    food_beverage: "Food & Beverage",
    healthcare: "Healthcare",
    education: "Education",
  };
  
  export const LOCATIONS: BusinessLocation[] = ["Kigali", "Musanze", "Huye", "Rubavu", "Muhanga"];
  
  export const CONNECTION_STATUS_META: Record<
    ConnectionStatus,
    { label: string; badge: NonNullable<BadgeProps["variant"]> }
  > = {
    connected: { label: "Connected", badge: "success" },
    pending_sent: { label: "Request Sent", badge: "muted" },
    pending_received: { label: "Wants to Connect", badge: "warning" },
    not_connected: { label: "Not Connected", badge: "outline" },
  };
  
  export const RELATIONSHIP_META: Record<RelationshipType, { label: string; badge: NonNullable<BadgeProps["variant"]> }> = {
    customer: { label: "Customer", badge: "default" },
    supplier: { label: "Supplier", badge: "secondary" },
    partner: { label: "Partner", badge: "warning" },
    connected: { label: "Connected", badge: "success" },
  };
  
  export const AVAILABILITY_META: Record<Availability, { label: string; badge: NonNullable<BadgeProps["variant"]> }> = {
    in_stock: { label: "In Stock", badge: "success" },
    limited_stock: { label: "Limited Stock", badge: "warning" },
    out_of_stock: { label: "Out of Stock", badge: "muted" },
  };