// ---------------------------------------------------------------------------
// Core OSENT Business Network types.
// Every Business Network component should import from here — never
// duplicate a shape inline, and never read the mock data files directly
// except from the small set of getX() functions that stand in for the API.
// ---------------------------------------------------------------------------

export type BusinessCategory =
  | "wholesale"
  | "retail"
  | "manufacturing"
  | "agriculture"
  | "construction"
  | "technology"
  | "logistics"
  | "professional_services"
  | "hospitality"
  | "food_beverage"
  | "healthcare"
  | "education";

export type BusinessLocation =
  | "Kigali"
  | "Musanze"
  | "Huye"
  | "Rubavu"
  | "Muhanga";

export type VerificationStatus = "verified" | "unverified";

/** The nature of an existing relationship once two businesses are connected. */
export type RelationshipType = "customer" | "supplier" | "partner" | "connected";

/** Where a connection currently stands between "my business" and another. */
export type ConnectionStatus =
  | "connected"
  | "pending_sent" // I sent a connection request, awaiting their response
  | "pending_received" // They sent me a request, awaiting my response
  | "not_connected";

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
}

export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  location: BusinessLocation;
  description: string;
  avatarUrl?: string; // absent in mock data — UI falls back to initials
  verification: VerificationStatus;
  establishedYear?: number;
  registrationNumber?: string;
  contact: ContactInfo;

  connectionStatus: ConnectionStatus;
  relationship?: RelationshipType; // only meaningful when connectionStatus === "connected"
  connectedAt?: string; // ISO date

  productPreview?: string[]; // a few product/service names for the discovery card
  servicePreview?: string[];
}

// ---------------------------------------------------------------------------
// Connections (My Businesses)
// ---------------------------------------------------------------------------

export interface Connection {
  businessId: string;
  status: ConnectionStatus;
  relationship?: RelationshipType;
  connectedAt?: string; // ISO date, present once status === "connected"
  requestedAt?: string; // ISO date, present for pending states
  lastActivityAt: string; // ISO date
  lastActivitySummary: string; // e.g. "Purchase order sent 2 days ago"
}

// ---------------------------------------------------------------------------
// Customers & Suppliers
// These reuse Connection but add the transaction-facing fields those two
// pages need, rather than forcing Connection to carry fields most
// relationships (e.g. "partner") never use.
// ---------------------------------------------------------------------------

export interface CustomerRelation {
  businessId: string;
  relationshipStatus: RelationshipType;
  lastTransactionAt?: string; // ISO date
  totalTransactions: number;
  lastActivityAt: string; // ISO date
  lastActivitySummary: string;
}

export interface SupplierRelation {
  businessId: string;
  relationshipStatus: RelationshipType;
  offerings: string[]; // products/services this supplier provides us
  lastOrderAt?: string; // ISO date
  lastActivityAt: string; // ISO date
  lastActivitySummary: string;
}

// ---------------------------------------------------------------------------
// Business profile activity (relationship history shown on /business/[id])
// ---------------------------------------------------------------------------

export type BusinessActivityKind =
  | "connected"
  | "connection_requested"
  | "quotation_sent"
  | "quotation_received"
  | "purchase_order"
  | "sales_order"
  | "invoice"
  | "delivery"
  | "profile_updated"
  | "message";

export interface BusinessActivityEvent {
  id: string;
  kind: BusinessActivityKind;
  businessId: string;
  message: string; // human-readable, already composed
  createdAt: string; // ISO date
  relatedReference?: string; // e.g. "PO-2026-0024"
}

// ---------------------------------------------------------------------------
// Messaging
// ---------------------------------------------------------------------------

export interface MessageAttachment {
  id: string;
  name: string;
  kind: "document" | "image" | "spreadsheet" | "other";
}

export interface Message {
  id: string;
  conversationId: string;
  authorId: string; // a Person id (see data/users) or "me"
  body: string;
  createdAt: string; // ISO date
  attachments?: MessageAttachment[];
  relatedReference?: string; // e.g. "PO-2026-0042"
}

export interface Conversation {
  id: string;
  businessId: string;
  lastMessage: string;
  lastMessageAt: string; // ISO date
  unreadCount: number;
  isRecentlyActive: boolean; // shown as an "active recently" indicator
}

// ---------------------------------------------------------------------------
// Marketplace
// ---------------------------------------------------------------------------

export type Availability = "in_stock" | "limited_stock" | "out_of_stock";

export interface Product {
  id: string;
  name: string;
  businessId: string;
  category: BusinessCategory;
  imageUrl?: string;
  price?: string; // e.g. "RWF 8,500 / bag" — absent when priceOnRequest
  priceOnRequest: boolean;
  availability: Availability;
  location: BusinessLocation;
  minimumOrderQuantity: string; // e.g. "50 bags"
}

export interface Service {
  id: string;
  name: string;
  businessId: string;
  category: BusinessCategory;
  location: BusinessLocation;
  description: string;
  startingPrice?: string; // e.g. "From RWF 50,000"
  priceOnRequest: boolean;
}

export interface MarketplaceCategory {
  id: string;
  name: string;
  category: BusinessCategory;
  icon: string; // lucide-react icon name, e.g. "Tractor"
  description: string;
  businessCount: number;
  listingCount: number;
}