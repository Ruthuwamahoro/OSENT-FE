"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { MessageThread } from "@/components/business-network/message-thread";
import { MessageThreadSkeleton } from "@/components/business-network/skeletons";
import { getConversationById, getMessagesForConversation } from "@/data/messages";
import { getBusinessById } from "@/data/businesses";
import type { Business, Message } from "@/utils/types/business";

export default function ConversationPage() {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState<Business | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const conversation = getConversationById(params.id);
      const foundBusiness = conversation ? getBusinessById(conversation.businessId) : undefined;
      if (!conversation || !foundBusiness) {
        setMissing(true);
      } else {
        setBusiness(foundBusiness);
        setMessages(getMessagesForConversation(params.id));
      }
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [params.id]);

  if (missing) {
    notFound();
  }

  function handleSend(body: string) {
    setMessages((prev) => [
      ...prev,
      { id: `m-${Date.now()}`, conversationId: params.id, authorId: "me", body, createdAt: new Date().toISOString() },
    ]);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {loading || !business ? <MessageThreadSkeleton /> : <MessageThread business={business} messages={messages} onSend={handleSend} />}
    </main>
  );
}