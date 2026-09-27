import type { Product, Service, MarketplaceCategory, BusinessCategory } from "@/utils/types/business";
import { businesses } from "@/data/businesses";

// ---------------------------------------------------------------------------
// Mock data only. `getProducts()` / `getServices()` / `getMarketplaceCategories()`
// stand in for future API calls. Category business/listing counts are
// computed from the mock records below rather than hardcoded, so they never
// drift out of sync while this is still mock data.
// ---------------------------------------------------------------------------

export const products: Product[] = [
  {
    id: "p-01",
    name: "Portland Cement",
    businessId: "b-10",
    category: "construction",
    price: "RWF 9,500 / bag",
    priceOnRequest: false,
    availability: "in_stock",
    location: "Huye",
    minimumOrderQuantity: "50 bags",
  },
  {
    id: "p-02",
    name: "Roofing Sheets",
    businessId: "b-01",
    category: "construction",
    price: "RWF 12,000 / sheet",
    priceOnRequest: false,
    availability: "in_stock",
    location: "Kigali",
    minimumOrderQuantity: "20 sheets",
  },
  {
    id: "p-03",
    name: "Office Chairs",
    businessId: "b-05",
    category: "retail",
    priceOnRequest: true,
    availability: "limited_stock",
    location: "Huye",
    minimumOrderQuantity: "10 units",
  },
  {
    id: "p-04",
    name: "Solar Panels",
    businessId: "b-06",
    category: "technology",
    price: "RWF 350,000 / panel",
    priceOnRequest: false,
    availability: "limited_stock",
    location: "Kigali",
    minimumOrderQuantity: "5 panels",
  },
  {
    id: "p-05",
    name: "Packaging Materials",
    businessId: "b-02",
    category: "wholesale",
    price: "RWF 3,200 / carton",
    priceOnRequest: false,
    availability: "in_stock",
    location: "Kigali",
    minimumOrderQuantity: "100 cartons",
  },
  {
    id: "p-06",
    name: "Agricultural Inputs",
    businessId: "b-03",
    category: "agriculture",
    price: "RWF 15,000 / bag",
    priceOnRequest: false,
    availability: "in_stock",
    location: "Musanze",
    minimumOrderQuantity: "25 bags",
  },
  {
    id: "p-07",
    name: "Computer Accessories",
    businessId: "b-09",
    category: "technology",
    priceOnRequest: true,
    availability: "in_stock",
    location: "Kigali",
    minimumOrderQuantity: "20 units",
  },
  {
    id: "p-08",
    name: "Farm Equipment",
    businessId: "b-07",
    category: "agriculture",
    priceOnRequest: true,
    availability: "limited_stock",
    location: "Muhanga",
    minimumOrderQuantity: "1 unit",
  },
  {
    id: "p-09",
    name: "Timber",
    businessId: "b-10",
    category: "construction",
    price: "RWF 4,500 / plank",
    priceOnRequest: false,
    availability: "in_stock",
    location: "Huye",
    minimumOrderQuantity: "100 planks",
  },
  {
    id: "p-10",
    name: "Beverages",
    businessId: "b-08",
    category: "food_beverage",
    price: "RWF 800 / crate",
    priceOnRequest: false,
    availability: "in_stock",
    location: "Rubavu",
    minimumOrderQuantity: "50 crates",
  },
];

export const services: Service[] = [
  {
    id: "s-01",
    name: "Last-mile Delivery",
    businessId: "b-04",
    category: "logistics",
    location: "Kigali",
    description: "Scheduled and on-demand delivery runs for retailers and wholesalers across Kigali and nearby districts.",
    startingPrice: "From RWF 15,000 / delivery",
    priceOnRequest: false,
  },
  {
    id: "s-02",
    name: "Warehousing",
    businessId: "b-04",
    category: "logistics",
    location: "Kigali",
    description: "Short and long-term storage with inventory tracking for distributors and manufacturers.",
    priceOnRequest: true,
  },
  {
    id: "s-03",
    name: "Construction Services",
    businessId: "b-06",
    category: "construction",
    location: "Kigali",
    description: "Residential and commercial construction, from foundation work to finishing.",
    priceOnRequest: true,
  },
  {
    id: "s-04",
    name: "Equipment Rental",
    businessId: "b-06",
    category: "construction",
    location: "Kigali",
    description: "Rental of construction machinery and equipment by the day or by the project.",
    startingPrice: "From RWF 50,000 / day",
    priceOnRequest: false,
  },
  {
    id: "s-05",
    name: "Accounting & Bookkeeping",
    businessId: "b-11",
    category: "professional_services",
    location: "Kigali",
    description: "Monthly bookkeeping, tax filing, and financial reporting for SMEs.",
    startingPrice: "From RWF 80,000 / month",
    priceOnRequest: false,
  },
  {
    id: "s-06",
    name: "Business Consulting",
    businessId: "b-11",
    category: "professional_services",
    location: "Kigali",
    description: "Strategy, business registration, and compliance advisory for growing SMEs.",
    priceOnRequest: true,
  },
  {
    id: "s-07",
    name: "Software Development",
    businessId: "b-12",
    category: "technology",
    location: "Kigali",
    description: "Custom business systems, websites, and internal tools built for local operations.",
    priceOnRequest: true,
  },
  {
    id: "s-08",
    name: "Graphic Design",
    businessId: "b-12",
    category: "technology",
    location: "Kigali",
    description: "Branding, packaging, and marketing design for product and service businesses.",
    startingPrice: "From RWF 40,000 / project",
    priceOnRequest: false,
  },
];

const CATEGORY_BASE: { category: BusinessCategory; name: string; icon: string; description: string }[] = [
  { category: "agriculture", name: "Agriculture", icon: "Wheat", description: "Farm inputs, produce, and equipment." },
  { category: "construction", name: "Construction", icon: "HardHat", description: "Materials, contractors, and equipment rental." },
  { category: "technology", name: "Technology", icon: "Cpu", description: "Software, electronics, and digital services." },
  { category: "food_beverage", name: "Food & Beverage", icon: "UtensilsCrossed", description: "Beverages, packaged food, and supplies." },
  { category: "wholesale", name: "Wholesale", icon: "Warehouse", description: "Bulk goods and office supplies for resellers." },
  { category: "logistics", name: "Logistics", icon: "Truck", description: "Delivery, warehousing, and freight services." },
  { category: "manufacturing", name: "Manufacturing", icon: "Factory", description: "Production and industrial suppliers." },
  { category: "healthcare", name: "Healthcare", icon: "Stethoscope", description: "Clinics, pharmacies, and medical suppliers." },
  { category: "hospitality", name: "Hospitality", icon: "Hotel", description: "Hotels, catering, and event services." },
  { category: "professional_services", name: "Professional Services", icon: "Briefcase", description: "Accounting, legal, and consulting firms." },
  { category: "retail", name: "Retail", icon: "Store", description: "Shops and retail chains buying in bulk." },
  { category: "education", name: "Education", icon: "GraduationCap", description: "Training providers and schools." },
];

export const marketplaceCategories: MarketplaceCategory[] = CATEGORY_BASE.map((base) => ({
  id: `cat-${base.category}`,
  name: base.name,
  category: base.category,
  icon: base.icon,
  description: base.description,
  businessCount: businesses.filter((b) => b.category === base.category).length,
  listingCount:
    products.filter((p) => p.category === base.category).length +
    services.filter((s) => s.category === base.category).length,
}));

export function getProducts(): Product[] {
  return products;
}

export function getServices(): Service[] {
  return services;
}

export function getMarketplaceCategories(): MarketplaceCategory[] {
  return marketplaceCategories;
}