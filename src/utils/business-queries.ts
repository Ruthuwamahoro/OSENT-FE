import type {
    Business,
    BusinessCategory,
    BusinessLocation,
    Connection,
    Product,
    Service,
  } from "@/utils/types/business";
  import { CATEGORY_LABELS } from "@/components/business-network/meta";
  
  // ---------------------------------------------------------------------------
  // Business discovery / directory filtering
  // ---------------------------------------------------------------------------
  
  export interface BusinessFilters {
    search?: string;
    category?: BusinessCategory;
    location?: BusinessLocation;
  }
  
  export function filterBusinesses(businesses: Business[], filters: BusinessFilters): Business[] {
    return businesses.filter((b) => {
      if (filters.category && b.category !== filters.category) return false;
      if (filters.location && b.location !== filters.location) return false;
  
      if (filters.search) {
        const q = filters.search.trim().toLowerCase();
        if (!q) return true;
        const haystack = [
          b.name,
          b.description,
          CATEGORY_LABELS[b.category],
          b.location,
          ...(b.productPreview ?? []),
          ...(b.servicePreview ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
  
      return true;
    });
  }
  
  // ---------------------------------------------------------------------------
  // Connections
  // ---------------------------------------------------------------------------
  
  const RECENTLY_CONNECTED_WINDOW_DAYS = 60;
  
  export function getAllConnections(connections: Connection[]): Connection[] {
    return connections.filter((c) => c.status === "connected");
  }
  
  export function getRecentlyConnected(connections: Connection[], now: Date = new Date()): Connection[] {
    return connections.filter((c) => {
      if (c.status !== "connected" || !c.connectedAt) return false;
      const days = (now.getTime() - new Date(c.connectedAt).getTime()) / 86_400_000;
      return days <= RECENTLY_CONNECTED_WINDOW_DAYS;
    });
  }
  
  export function getPendingReceived(connections: Connection[]): Connection[] {
    return connections.filter((c) => c.status === "pending_received");
  }
  
  export function getPendingSent(connections: Connection[]): Connection[] {
    return connections.filter((c) => c.status === "pending_sent");
  }
  
  // ---------------------------------------------------------------------------
  // Marketplace
  // ---------------------------------------------------------------------------
  
  export interface ProductFilters {
    search?: string;
    category?: BusinessCategory;
    location?: BusinessLocation;
  }
  
  export function filterProducts(
    productsList: Product[],
    filters: ProductFilters,
    businessName: (id: string) => string
  ): Product[] {
    return productsList.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.location && p.location !== filters.location) return false;
  
      if (filters.search) {
        const q = filters.search.trim().toLowerCase();
        if (!q) return true;
        const haystack = [p.name, CATEGORY_LABELS[p.category], p.location, businessName(p.businessId)]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
  
      return true;
    });
  }
  
  export function filterServices(
    servicesList: Service[],
    filters: ProductFilters,
    businessName: (id: string) => string
  ): Service[] {
    return servicesList.filter((s) => {
      if (filters.category && s.category !== filters.category) return false;
      if (filters.location && s.location !== filters.location) return false;
  
      if (filters.search) {
        const q = filters.search.trim().toLowerCase();
        if (!q) return true;
        const haystack = [s.name, s.description, CATEGORY_LABELS[s.category], s.location, businessName(s.businessId)]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
  
      return true;
    });
  }