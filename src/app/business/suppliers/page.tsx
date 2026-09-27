"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SupplierTable } from "@/components/business-network/supplier-table";
import { RelationTableSkeleton } from "@/components/business-network/skeletons";
import { RequestQuoteDialog } from "@/components/business-network/request-quote-dialog";
import { getBusinesses } from "@/data/businesses";
import { getSuppliers } from "@/data/suppliers";
import type { Business, SupplierRelation } from "@/utils/types/business";

export default function SuppliersPage() {
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState<SupplierRelation[]>([]);
  const [businesses, setBusinesses] = useState<Record<string, Business>>({});
  const [search, setSearch] = useState("");
  const [quoteTarget, setQuoteTarget] = useState<Business | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuppliers(getSuppliers());
      setBusinesses(Object.fromEntries(getBusinesses().map((b) => [b.id, b])));
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return suppliers;
    return suppliers.filter((s) => businesses[s.businessId]?.name.toLowerCase().includes(q));
  }, [suppliers, businesses, search]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Suppliers</h1>
        <p className="mt-1 text-sm text-muted-foreground">Businesses you buy from.</p>
      </header>

      <div className="relative mb-4 max-w-xs">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search suppliers…" className="pl-8" />
      </div>

      {loading ? (
        <RelationTableSkeleton />
      ) : (
        <SupplierTable
          suppliers={visible}
          businesses={businesses}
          onRequestQuote={(id) => setQuoteTarget(businesses[id] ?? null)}
        />
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