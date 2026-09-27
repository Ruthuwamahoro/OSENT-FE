"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { BusinessProfile } from "@/components/business-network/business-profile";
import { BusinessProfileSkeleton } from "@/components/business-network/skeletons";
import { getBusinessById } from "@/data/businesses";
import { getActivityForBusiness } from "@/data/business-activity";
import { getProducts, getServices } from "@/data/marketplace";
import type { Business, BusinessActivityEvent, Product, Service } from "@/utils/types/business";

export default function BusinessProfilePage() {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState<Business | null>(null);
  const [activity, setActivity] = useState<BusinessActivityEvent[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = getBusinessById(params.id);
      if (!found) {
        setMissing(true);
      } else {
        setBusiness(found);
        setActivity(getActivityForBusiness(params.id));
        setProducts(getProducts().filter((p) => p.businessId === params.id));
        setServices(getServices().filter((s) => s.businessId === params.id));
      }
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [params.id]);

  if (missing) {
    notFound();
  }

  function handleConnect() {
    setBusiness((prev) => (prev ? { ...prev, connectionStatus: "pending_sent" } : prev));
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {loading || !business ? (
        <BusinessProfileSkeleton />
      ) : (
        <BusinessProfile business={business} activity={activity} products={products} services={services} onConnect={handleConnect} />
      )}
    </main>
  );
}