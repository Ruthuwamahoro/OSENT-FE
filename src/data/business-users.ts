import type { ContactInfo } from "@/utils/types/business";

// ---------------------------------------------------------------------------
// People who represent the OTHER businesses in the network — the names that
// show up as message authors and activity actors (e.g. "Marie — Kigali
// Hardware Ltd"). This is separate from your own team (data/users.ts in the
// Tasks module) since these people work for businesses you're connected to,
// not for your own company.
//
// Business ids here ("b-01", "b-02", ...) match the ids used in
// data/businesses.ts (the next file) — keep them in sync.
// ---------------------------------------------------------------------------

export interface BusinessContact {
  id: string;
  businessId: string;
  name: string;
  role: string;
}

export const businessContacts: Record<string, BusinessContact> = {
  "c-01": { id: "c-01", businessId: "b-01", name: "Marie Uwase", role: "Sales Manager" },
  "c-02": { id: "c-02", businessId: "b-02", name: "Eric Mugisha", role: "Account Manager" },
  "c-03": { id: "c-03", businessId: "b-03", name: "Claudine Mukamana", role: "Operations Lead" },
  "c-04": { id: "c-04", businessId: "b-04", name: "Fabrice Niyonsenga", role: "Sales Representative" },
  "c-05": { id: "c-05", businessId: "b-05", name: "Solange Ingabire", role: "Store Manager" },
  "c-06": { id: "c-06", businessId: "b-06", name: "Olivier Bizimana", role: "Procurement Officer" },
  "c-07": { id: "c-07", businessId: "b-07", name: "Aline Uwimana", role: "Managing Director" },
  "c-08": { id: "c-08", businessId: "b-08", name: "Vincent Habiyaremye", role: "Warehouse Manager" },
  "c-09": { id: "c-09", businessId: "b-09", name: "Diane Uwizeyimana", role: "Procurement Manager" },
  "c-10": { id: "c-10", businessId: "b-10", name: "Patrick Nsengiyumva", role: "Sales Manager" },
};

export const businessContactList = Object.values(businessContacts);

export function contactName(id: string): string {
  return businessContacts[id]?.name ?? "Unknown";
}

export function getPrimaryContact(businessId: string): BusinessContact | undefined {
  return businessContactList.find((c) => c.businessId === businessId);
}

// Display name for messages/activity sent by "my business" side of a
// conversation (authorId "me" in data/messages.ts). Swap for the real
// session user once auth exists.
export const MY_DISPLAY_NAME = "Jean Nkurunziza";

// Placeholder shape used only when a business record doesn't specify its own
// ContactInfo yet — keeps components from needing to null-check everywhere.
export const fallbackContactInfo: ContactInfo = {
  phone: "+250 788 000 000",
  email: "info@example.rw",
};