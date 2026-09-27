import Link from "next/link";
import { Package, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AVAILABILITY_META, CATEGORY_LABELS } from "@/components/business-network/meta";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/utils/types/business";

export function ProductCard({ product, businessName }: { product: Product; businessName: string }) {
  const availability = AVAILABILITY_META[product.availability];

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex h-28 items-center justify-center bg-muted">
        <Package className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium leading-snug text-foreground">{product.name}</p>
          <Badge variant={availability.badge} className="shrink-0 font-normal">
            {availability.label}
          </Badge>
        </div>
        <Link href={`/business/${product.businessId}`} className="block text-xs text-muted-foreground hover:underline">
          {businessName}
        </Link>
        <p className="text-xs text-muted-foreground">{CATEGORY_LABELS[product.category]}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {product.location}
        </div>
        <p className="text-xs text-muted-foreground">MOQ: {product.minimumOrderQuantity}</p>

        <div className="flex items-center justify-between pt-1">
          <p className="text-sm font-medium text-foreground">{product.priceOnRequest ? "Request Quote" : product.price}</p>
          <Button size="sm" variant="outline">
            <Link href={`/business/${product.businessId}`}>View Product</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}