import Link from "next/link";
import {
  Wheat,
  HardHat,
  Cpu,
  UtensilsCrossed,
  Warehouse,
  Truck,
  Factory,
  Stethoscope,
  Hotel,
  Briefcase,
  Store,
  GraduationCap,
  type LucideIcon,
  Boxes,
} from "lucide-react";
import type { MarketplaceCategory } from "@/utils/types/business";

const ICONS: Record<string, LucideIcon> = {
  Wheat,
  HardHat,
  Cpu,
  UtensilsCrossed,
  Warehouse,
  Truck,
  Factory,
  Stethoscope,
  Hotel,
  Briefcase,
  Store,
  GraduationCap,
};

export function CategoryCard({ category }: { category: MarketplaceCategory }) {
  const Icon = ICONS[category.icon] ?? Boxes;

  return (
    <Link
      href={`/business?category=${category.category}`}
      className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/30"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
        <Icon className="h-4 w-4 text-secondary-foreground" />
      </div>
      <p className="mt-3 text-sm font-medium text-foreground">{category.name}</p>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{category.description}</p>
      <p className="mt-3 text-xs text-muted-foreground">
        {category.businessCount} businesses · {category.listingCount} listings
      </p>
    </Link>
  );
}