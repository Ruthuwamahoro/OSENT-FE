"use client";

import { useEffect, useState } from "react";
import { ConversationList } from "@/components/business-network/conversation-list";
import { ConversationListSkeleton } from "@/components/business-network/skeletons";
import { getConversations } from "@/data/messages";
import { getBusinesses } from "@/data/businesses";
import type { Business, Conversation } from "@/utils/types/business";

export default function BusinessMessagesPage() {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [businesses, setBusinesses] = useState<Record<string, Business>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setConversations(getConversations());
      setBusinesses(Object.fromEntries(getBusinesses().map((b) => [b.id, b])));
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">Conversations with businesses in your network.</p>
      </header>

      {loading ? <ConversationListSkeleton /> : <ConversationList conversations={conversations} businesses={businesses} />}
    </main>
  );
}