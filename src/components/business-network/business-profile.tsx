"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Calendar,
  FileText,
  UserPlus,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ConnectionStatusBadge, RelationshipBadge, VerificationBadge } from "@/components/business-network/connection-badge";
import { RequestQuoteDialog } from "@/components/business-network/request-quote-dialog";
import { CATEGORY_LABELS } from "@/components/business-network/meta";
import { ActivityFeed } from "@/components/business-network/activity-feed";
import { formatRelative, initials } from "@/lib/utils";
import type { Business, BusinessActivityEvent, Product, Service } from "@/utils/types/business";

interface BusinessProfileProps {
  business: Business;
  activity: BusinessActivityEvent[];
  products: Product[];
  services: Service[];
  onConnect: () => void;
}

export function BusinessProfile({ business, activity, products, services, onConnect }: BusinessProfileProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const offerings = [...products.map((p) => p.name), ...services.map((s) => s.name)];

  return (
    <div>
      <Link href="/business" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Discover
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 shrink-0 rounded-lg">
            <AvatarFallback className="rounded-lg text-lg">{initials(business.name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">{business.name}</h1>
              <VerificationBadge verified={business.verification === "verified"} />
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {CATEGORY_LABELS[business.category]} ·{" "}
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {business.location}
              </span>
            </p>
            <div className="mt-2 flex items-center gap-2">
              <ConnectionStatusBadge status={business.connectionStatus} />
              {business.relationship && <RelationshipBadge relationship={business.relationship} />}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          {business.connectionStatus === "not_connected" && (
            <Button size="sm" className="gap-1.5" onClick={onConnect}>
              <UserPlus className="h-4 w-4" />
              Connect
            </Button>
          )}
          {business.connectionStatus === "pending_sent" && (
            <Button size="sm" variant="secondary" disabled>
              Request Sent
            </Button>
          )}
          <Button size="sm" variant="outline" className="gap-1.5">
            <Link href={`/business/messages/conv-${business.id}`}>
              <MessageSquare className="h-4 w-4" />
              Message
            </Link>
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setQuoteOpen(true)}>
            <FileText className="h-4 w-4" />
            Request Quote
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid gap-8 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 space-y-8">
          <section>
            <h2 className="mb-2 text-sm font-medium text-foreground">About</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{business.description}</p>
          </section>

          {offerings.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-medium text-foreground">Products & Services</h2>
              <div className="flex flex-wrap gap-2">
                {offerings.map((name) => (
                  <span key={name} className="rounded-md border border-border px-2.5 py-1 text-xs text-foreground">
                    {name}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="mb-3 text-sm font-medium text-foreground">Activity</h2>
            <ActivityFeed activity={activity} businesses={{ [business.id]: business }} showBusinessName={false} />
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="space-y-3 rounded-lg border border-border p-4 text-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Business Information</p>
            <dl className="space-y-2.5">
              {business.establishedYear && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  Established {business.establishedYear}
                </div>
              )}
              {business.registrationNumber && (
                <div className="text-xs text-muted-foreground">Reg. No. {business.registrationNumber}</div>
              )}
              {business.contact.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  {business.contact.phone}
                </div>
              )}
              {business.contact.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  {business.contact.email}
                </div>
              )}
              {business.contact.address && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {business.contact.address}
                </div>
              )}
            </dl>
          </div>

          {business.connectedAt && (
            <div className="rounded-lg border border-border p-4 text-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Relationship</p>
              <p className="mt-2 text-foreground">
                {business.relationship && <RelationshipBadge relationship={business.relationship} />}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Connected {formatRelative(business.connectedAt)}</p>
            </div>
          )}
        </aside>
      </div>

      <RequestQuoteDialog businessName={business.name} open={quoteOpen} onOpenChange={setQuoteOpen} onSubmit={() => {}} />
    </div>
  );
}