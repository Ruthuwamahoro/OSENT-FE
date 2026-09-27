"use client";

import { useEffect, useState } from "react";
import { ActivityFeed } from "@/components/business-network/activity-feed";
import { ActivityFeedSkeleton } from "@/components/business-network/skeletons";
import { getBusinessActivity } from "@/data/business-activity";
import { getBusinesses } from "@/data/businesses";
import type { Business, BusinessActivityEvent } from "@/utils/types/business";

export default function BusinessActivityPage() {
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState<BusinessActivityEvent[]>([]);
  const [businesses, setBusinesses] = useState<Record<string, Business>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setActivity(getBusinessActivity());
      setBusinesses(Object.fromEntries(getBusinesses().map((b) => [b.id, b])));
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Activity</h1>
        <p className="mt-1 text-sm text-muted-foreground">Recent activity across your business network.</p>
      </header>

      {loading ? <ActivityFeedSkeleton /> : <ActivityFeed activity={activity} businesses={businesses} />}
    </main>
  );
}