import type { Business } from "@/utils/types/business";

// ---------------------------------------------------------------------------
// Mock data only. Replace `getBusinesses()` / `getBusinessById()` with real
// OSENT API calls and every Business Network component keeps working
// unchanged, since they all consume the `Business` type, not this file.
// ---------------------------------------------------------------------------

const now = new Date();
function daysAgo(n: number) {
  return new Date(now.getTime() - n * 86_400_000).toISOString();
}
function monthsAgo(n: number) {
  const d = new Date(now);
  d.setMonth(d.getMonth() - n);
  return d.toISOString();
}

export const businesses: Business[] = [
  {
    id: "b-01",
    name: "Kigali Hardware Ltd",
    category: "wholesale",
    location: "Kigali",
    description:
      "A wholesale supplier of construction hardware, tools, and roofing materials serving contractors and retailers across Kigali.",
    verification: "verified",
    establishedYear: 2011,
    registrationNumber: "RDB-2011-04521",
    contact: { phone: "+250 788 123 456", email: "sales@kigalihardware.rw", address: "KN 4 Ave, Nyarugenge, Kigali" },
    connectionStatus: "connected",
    relationship: "customer",
    connectedAt: monthsAgo(8),
    productPreview: ["Roofing Sheets", "Portland Cement", "Nails & Fasteners"],
  },
  {
    id: "b-02",
    name: "Umucyo Supplies Ltd",
    category: "wholesale",
    location: "Kigali",
    description:
      "Wholesale distributor of packaging materials and general supplies for retailers and manufacturers.",
    verification: "verified",
    establishedYear: 2015,
    registrationNumber: "RDB-2015-08832",
    contact: { phone: "+250 788 234 567", email: "info@umucyosupplies.rw", address: "Kicukiro, Kigali" },
    connectionStatus: "connected",
    relationship: "supplier",
    connectedAt: monthsAgo(5),
    productPreview: ["Packaging Materials", "Printed Cartons"],
  },
  {
    id: "b-03",
    name: "Green Valley Traders",
    category: "agriculture",
    location: "Musanze",
    description:
      "Agricultural inputs and produce trading company supplying seeds, fertilizer, and fresh produce to distributors nationwide.",
    verification: "verified",
    establishedYear: 2018,
    contact: { phone: "+250 788 345 678", email: "contact@greenvalley.rw", address: "Musanze District" },
    connectionStatus: "connected",
    relationship: "partner",
    connectedAt: monthsAgo(3),
    productPreview: ["Agricultural Inputs", "Fresh Produce"],
  },
  {
    id: "b-04",
    name: "Imboni Distribution",
    category: "logistics",
    location: "Kigali",
    description:
      "Regional logistics and distribution company handling last-mile delivery for retailers and wholesalers.",
    verification: "verified",
    establishedYear: 2013,
    contact: { phone: "+250 788 456 789", email: "ops@imbonidist.rw", address: "Gikondo, Kigali" },
    connectionStatus: "pending_sent",
    servicePreview: ["Last-mile Delivery", "Warehousing"],
  },
  {
    id: "b-05",
    name: "Amahoro Retail Ltd",
    category: "retail",
    location: "Huye",
    description: "A growing retail chain selling household goods, electronics, and general merchandise in the Southern Province.",
    verification: "unverified",
    establishedYear: 2020,
    contact: { phone: "+250 788 567 890", email: "hello@amahororetail.rw", address: "Huye Town" },
    connectionStatus: "not_connected",
    productPreview: ["Household Goods", "Electronics"],
  },
  {
    id: "b-06",
    name: "Bright Rwanda Ltd",
    category: "construction",
    location: "Kigali",
    description: "Construction and civil works contractor delivering residential and commercial building projects.",
    verification: "verified",
    establishedYear: 2009,
    registrationNumber: "RDB-2009-01187",
    contact: { phone: "+250 788 678 901", email: "info@brightrwanda.rw", address: "Kimironko, Kigali" },
    connectionStatus: "pending_received",
    servicePreview: ["Construction", "Equipment Rental"],
  },
  {
    id: "b-07",
    name: "Muhanga Agro Supply",
    category: "agriculture",
    location: "Muhanga",
    description: "Supplier of agricultural equipment and inputs serving cooperatives and farms in the Southern Province.",
    verification: "unverified",
    establishedYear: 2019,
    contact: { phone: "+250 788 789 012", email: "sales@muhangaagro.rw", address: "Muhanga District" },
    connectionStatus: "not_connected",
    productPreview: ["Farm Equipment", "Seeds & Fertilizer"],
  },
  {
    id: "b-08",
    name: "Rubavu Wholesale Center",
    category: "wholesale",
    location: "Rubavu",
    description: "A wholesale trading hub supplying general merchandise to retailers across the Western Province.",
    verification: "verified",
    establishedYear: 2016,
    contact: { phone: "+250 788 890 123", email: "contact@rubavuwholesale.rw", address: "Rubavu Town" },
    connectionStatus: "connected",
    relationship: "connected",
    connectedAt: daysAgo(20),
    productPreview: ["General Merchandise", "Beverages"],
  },
  {
    id: "b-09",
    name: "Nyabugogo Traders",
    category: "retail",
    location: "Kigali",
    description: "A retail chain buying general hardware and packaged goods in bulk for resale across its branch network.",
    verification: "verified",
    establishedYear: 2014,
    contact: { phone: "+250 788 901 234", email: "procurement@nyabugogotraders.rw", address: "Nyabugogo, Kigali" },
    connectionStatus: "connected",
    relationship: "customer",
    connectedAt: monthsAgo(6),
    productPreview: ["Hardware Resale", "Packaged Goods"],
  },
  {
    id: "b-10",
    name: "Huye Building Supplies",
    category: "construction",
    location: "Huye",
    description: "Regional building materials supplier providing cement, timber, and finishing materials to contractors in the south.",
    verification: "verified",
    establishedYear: 2012,
    contact: { phone: "+250 788 012 345", email: "orders@huyebuilding.rw", address: "Huye Town" },
    connectionStatus: "connected",
    relationship: "supplier",
    connectedAt: monthsAgo(10),
    productPreview: ["Cement", "Timber", "Finishing Materials"],
  },
  {
    id: "b-11",
    name: "Kigali Business Solutions",
    category: "professional_services",
    location: "Kigali",
    description: "Accounting, tax, and legal advisory firm supporting SMEs with compliance, bookkeeping, and business registration.",
    verification: "verified",
    establishedYear: 2017,
    contact: { phone: "+250 788 111 222", email: "hello@kigalibizsolutions.rw", address: "Kacyiru, Kigali" },
    connectionStatus: "not_connected",
    servicePreview: ["Accounting", "Legal Services", "Business Consulting"],
  },
  {
    id: "b-12",
    name: "Vertex Software Rwanda",
    category: "technology",
    location: "Kigali",
    description: "A software and digital services studio building websites, business systems, and marketing campaigns for local companies.",
    verification: "verified",
    establishedYear: 2019,
    contact: { phone: "+250 788 222 333", email: "team@vertexsoftware.rw", address: "Remera, Kigali" },
    connectionStatus: "not_connected",
    servicePreview: ["Software Development", "Graphic Design", "Marketing"],
  },
];

export function getBusinesses(): Business[] {
  return businesses;
}

export function getBusinessById(id: string): Business | undefined {
  return businesses.find((b) => b.id === id);
}