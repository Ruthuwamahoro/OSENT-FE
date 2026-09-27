"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Building2 } from "lucide-react";
import { BusinessCard } from "@/components/business-network/business-card";
import { BusinessFiltersBar } from "@/components/business-network/business-filters";
import { BusinessEmptyState } from "@/components/business-network/empty-state";
import { RequestQuoteDialog } from "@/components/business-network/request-quote-dialog";
import { BusinessGridSkeleton } from "@/components/business-network/skeletons";
import { getBusinesses } from "@/data/businesses";
import { filterBusinesses } from "@/utils/business-queries";
import type { Business, BusinessCategory, BusinessLocation } from "@/utils/types/business";

export default function DiscoverBusinessesPage() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as BusinessCategory | null) ?? undefined;

  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<BusinessCategory | undefined>(initialCategory);
  const [location, setLocation] = useState<BusinessLocation | undefined>();
  const [quoteTarget, setQuoteTarget] = useState<Business | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBusinesses(getBusinesses());
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const visible = useMemo(
    () => filterBusinesses(businesses, { search, category, location }),
    [businesses, search, category, location]
  );

  function handleConnect(id: string) {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === id ? { ...b, connectionStatus: "pending_sent" } : b))
    );
  }

  function handleRequestQuote(id: string) {
    const business = businesses.find((b) => b.id === id) ?? null;
    setQuoteTarget(business);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Discover Businesses</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Find businesses to buy from, sell to, or partner with across the network.
        </p>
      </header>

      <div className="mb-6">
        <BusinessFiltersBar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          location={location}
          onLocationChange={setLocation}
        />
      </div>

      {loading ? (
        <BusinessGridSkeleton />
      ) : visible.length === 0 ? (
        <BusinessEmptyState
          icon={Building2}
          title="No businesses found"
          description="Try a different search term, category, or location."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((business) => (
            <BusinessCard key={business.id} business={business} onConnect={handleConnect} onRequestQuote={handleRequestQuote} />
          ))}
        </div>
      )}

      {quoteTarget && (
        <RequestQuoteDialog
          businessName={quoteTarget.name}
          open={!!quoteTarget}
          onOpenChange={(open) => !open && setQuoteTarget(null)}
          onSubmit={() => setQuoteTarget(null)}
        />
      )}
    </main>
  );
}