"use client";

import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConnectionList } from "@/components/business-network/connection-list";
import { RelationTableSkeleton } from "@/components/business-network/skeletons";
import { getBusinesses } from "@/data/businesses";
import { getConnections } from "@/data/connections";
import {
  getAllConnections,
  getPendingReceived,
  getPendingSent,
  getRecentlyConnected,
} from "@/utils/business-queries";
import type { Business, Connection } from "@/utils/types/business";

export default function ConnectionsPage() {
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [businesses, setBusinesses] = useState<Record<string, Business>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnections(getConnections());
      setBusinesses(Object.fromEntries(getBusinesses().map((b) => [b.id, b])));
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const all = useMemo(() => getAllConnections(connections), [connections]);
  const recent = useMemo(() => getRecentlyConnected(connections), [connections]);
  const received = useMemo(() => getPendingReceived(connections), [connections]);
  const sent = useMemo(() => getPendingSent(connections), [connections]);

  function updateStatus(businessId: string, status: Connection["status"]) {
    setConnections((prev) =>
      prev.map((c) =>
        c.businessId === businessId
          ? { ...c, status, connectedAt: status === "connected" ? new Date().toISOString() : c.connectedAt }
          : c
      )
    );
  }

  function removeConnection(businessId: string) {
    setConnections((prev) => prev.filter((c) => c.businessId !== businessId));
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">My Businesses</h1>
        <p className="mt-1 text-sm text-muted-foreground">Businesses connected to your business network.</p>
      </header>

      {loading ? (
        <RelationTableSkeleton />
      ) : (
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Connections</TabsTrigger>
            <TabsTrigger value="recent">Recently Connected</TabsTrigger>
            <TabsTrigger value="received">Pending Requests</TabsTrigger>
            <TabsTrigger value="sent">Sent Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ConnectionList
              connections={all}
              businesses={businesses}
              emptyTitle="No businesses connected yet"
              emptyDescription="Connect with businesses from Discover to start building your network."
            />
          </TabsContent>

          <TabsContent value="recent">
            <ConnectionList
              connections={recent}
              businesses={businesses}
              emptyTitle="Nothing recently connected"
              emptyDescription="New connections from the last 60 days will show up here."
            />
          </TabsContent>

          <TabsContent value="received">
            <ConnectionList
              connections={received}
              businesses={businesses}
              emptyTitle="No pending requests"
              emptyDescription="Connection requests from other businesses will appear here."
              onAccept={(id) => updateStatus(id, "connected")}
              onDecline={(id) => removeConnection(id)}
            />
          </TabsContent>

          <TabsContent value="sent">
            <ConnectionList
              connections={sent}
              businesses={businesses}
              emptyTitle="No requests sent"
              emptyDescription="Connection requests you send from Discover will appear here."
              onCancelRequest={(id) => removeConnection(id)}
            />
          </TabsContent>
        </Tabs>
      )}
    </main>
  );
}