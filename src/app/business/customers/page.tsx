"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CustomerTable } from "@/components/business-network/customer-table";
import { RelationTableSkeleton } from "@/components/business-network/skeletons";
import { getBusinesses } from "@/data/businesses";
import { getCustomers } from "@/data/customers";
import type { Business, CustomerRelation } from "@/utils/types/business";

export default function CustomersPage() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<CustomerRelation[]>([]);
  const [businesses, setBusinesses] = useState<Record<string, Business>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCustomers(getCustomers());
      setBusinesses(Object.fromEntries(getBusinesses().map((b) => [b.id, b])));
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((c) => businesses[c.businessId]?.name.toLowerCase().includes(q));
  }, [customers, businesses, search]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Customers</h1>
        <p className="mt-1 text-sm text-muted-foreground">Businesses that buy from you.</p>
      </header>

      <div className="relative mb-4 max-w-xs">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customers…" className="pl-8" />
      </div>

      {loading ? <RelationTableSkeleton /> : <CustomerTable customers={visible} businesses={businesses} />}
    </main>
  );
}