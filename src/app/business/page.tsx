import { Suspense } from "react";
import DiscoverBusinesses from "@/components/business-network/discover-businesses";
import { BusinessGridSkeleton } from "@/components/business-network/skeletons";

export default function BusinessPage() {
  return (
    <Suspense fallback={<BusinessGridSkeleton />}>
      <DiscoverBusinesses />
    </Suspense>
  );
}