"use client";

import { useEffect, useMemo, useState } from "react";
import { PackageSearch } from "lucide-react";
import { BusinessFiltersBar } from "@/components/business-network/business-filters";
import { ProductCard } from "@/components/business-network/product-card";
import { BusinessEmptyState } from "@/components/business-network/empty-state";
import { ListingGridSkeleton } from "@/components/business-network/skeletons";
import { getProducts } from "@/data/marketplace";
import { getBusinesses } from "@/data/businesses";
import { filterProducts } from "@/utils/business-queries";
import type { Business, BusinessCategory, BusinessLocation, Product } from "@/utils/types/business";

export default function MarketplaceProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [businesses, setBusinesses] = useState<Record<string, Business>>({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<BusinessCategory | undefined>();
  const [location, setLocation] = useState<BusinessLocation | undefined>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(getProducts());
      setBusinesses(Object.fromEntries(getBusinesses().map((b) => [b.id, b])));
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const businessName = (id: string) => businesses[id]?.name ?? "Unknown business";

  const visible = useMemo(
    () => filterProducts(products, { search, category, location }, businessName),
    [products, businesses, search, category, location]
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Products</h1>
        <p className="mt-1 text-sm text-muted-foreground">Discover products offered by businesses in your network.</p>
      </header>

      <div className="mb-6">
        <BusinessFiltersBar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          location={location}
          onLocationChange={setLocation}
          searchPlaceholder="Search products, categories, or suppliers…"
        />
      </div>

      {loading ? (
        <ListingGridSkeleton />
      ) : visible.length === 0 ? (
        <BusinessEmptyState icon={PackageSearch} title="No products found" description="Try a different search term, category, or location." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} businessName={businessName(product.businessId)} />
          ))}
        </div>
      )}
    </main>
  );
}