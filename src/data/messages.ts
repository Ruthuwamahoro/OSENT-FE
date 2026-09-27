import type { Conversation, Message } from "@/utils/types/business";

// ---------------------------------------------------------------------------
// Mock data only. `getConversations()` / `getMessagesForConversation()` stand
// in for future API calls. Conversation ids match business ids 1:1 here for
// simplicity ("conv-b-01" ~ business "b-01") since each business currently
// has a single thread — a real API may support several threads per business.
// ---------------------------------------------------------------------------

const now = new Date();
function minutesAgo(n: number) {
  return new Date(now.getTime() - n * 60_000).toISOString();
}
function hoursAgo(n: number) {
  return new Date(now.getTime() - n * 3_600_000).toISOString();
}
function daysAgo(n: number) {
  return new Date(now.getTime() - n * 86_400_000).toISOString();
}

export const conversations: Conversation[] = [
  {
    id: "conv-b-01",
    businessId: "b-01",
    lastMessage: "We can deliver by Tuesday afternoon.",
    lastMessageAt: minutesAgo(18),
    unreadCount: 2,
    isRecentlyActive: true,
  },
  {
    id: "conv-b-02",
    businessId: "b-02",
    lastMessage: "Invoice INV-2026-0041 has been sent to your email.",
    lastMessageAt: hoursAgo(5),
    unreadCount: 0,
    isRecentlyActive: true,
  },
  {
    id: "conv-b-03",
    businessId: "b-03",
    lastMessage: "Can you confirm whether the delivery can arrive on Tuesday?",
    lastMessageAt: daysAgo(1),
    unreadCount: 1,
    isRecentlyActive: false,
  },
  {
    id: "conv-b-04",
    businessId: "b-04",
    lastMessage: "Thanks — we'll get back to you by tomorrow morning.",
    lastMessageAt: daysAgo(2),
    unreadCount: 0,
    isRecentlyActive: false,
  },
];

export const messages: Record<string, Message[]> = {
  "conv-b-01": [
    {
      id: "m-01",
      conversationId: "conv-b-01",
      authorId: "c-01",
      body: "Hello, we received your purchase request.",
      createdAt: hoursAgo(3),
      relatedReference: "PO-2026-0042",
    },
    {
      id: "m-02",
      conversationId: "conv-b-01",
      authorId: "me",
      body: "Thank you. Could you confirm the expected delivery date?",
      createdAt: hoursAgo(2),
    },
    {
      id: "m-03",
      conversationId: "conv-b-01",
      authorId: "c-01",
      body: "We can deliver by Tuesday afternoon.",
      createdAt: minutesAgo(18),
    },
  ],
  "conv-b-02": [
    {
      id: "m-04",
      conversationId: "conv-b-02",
      authorId: "c-02",
      body: "Good afternoon — attaching the invoice for last week's order.",
      createdAt: hoursAgo(6),
      attachments: [{ id: "att-01", name: "INV-2026-0041.pdf", kind: "document" }],
      relatedReference: "INV-2026-0041",
    },
    {
      id: "m-05",
      conversationId: "conv-b-02",
      authorId: "c-02",
      body: "Invoice INV-2026-0041 has been sent to your email.",
      createdAt: hoursAgo(5),
    },
  ],
  "conv-b-03": [
    {
      id: "m-06",
      conversationId: "conv-b-03",
      authorId: "c-03",
      body: "Can you confirm whether the delivery can arrive on Tuesday?",
      createdAt: daysAgo(1),
      relatedReference: "PO-2026-0042",
    },
  ],
  "conv-b-04": [
    {
      id: "m-07",
      conversationId: "conv-b-04",
      authorId: "me",
      body: "We'd like a quote for weekly delivery runs between our Kigali warehouse and Huye.",
      createdAt: daysAgo(2),
    },
    {
      id: "m-08",
      conversationId: "conv-b-04",
      authorId: "c-04",
      body: "Thanks — we'll get back to you by tomorrow morning.",
      createdAt: daysAgo(2),
    },
  ],
};

export function getConversations(): Conversation[] {
  return [...conversations].sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
}

export function getConversationById(id: string): Conversation | undefined {
  return conversations.find((c) => c.id === id);
}

export function getConversationForBusiness(businessId: string): Conversation | undefined {
  return conversations.find((c) => c.businessId === businessId);
}

export function getMessagesForConversation(conversationId: string): Message[] {
  return messages[conversationId] ?? [];
}