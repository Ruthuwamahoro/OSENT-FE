"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_LABELS, LOCATIONS } from "./meta";
import type { BusinessCategory, BusinessLocation } from "@/utils/types/business";

interface BusinessFiltersBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category?: BusinessCategory;
  onCategoryChange: (value?: BusinessCategory) => void;
  location?: BusinessLocation;
  onLocationChange: (value?: BusinessLocation) => void;
  searchPlaceholder?: string;
}

export function BusinessFiltersBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  location,
  onLocationChange,
  searchPlaceholder = "Search by name, product, service, or category…",
}: BusinessFiltersBarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder={searchPlaceholder} className="pl-8" />
      </div>

      <div className="flex gap-2">
        <Select
          value={category ?? "any"}
          onValueChange={(v) => onCategoryChange(v === "any" ? undefined : (v as BusinessCategory))}
        >
          <SelectTrigger className="h-9 w-[10rem] text-xs sm:h-9">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any category</SelectItem>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={location ?? "any"}
          onValueChange={(v) => onLocationChange(v === "any" ? undefined : (v as BusinessLocation))}
        >
          <SelectTrigger className="h-9 w-[8.5rem] text-xs sm:h-9">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any location</SelectItem>
            {LOCATIONS.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}