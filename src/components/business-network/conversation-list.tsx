import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BusinessEmptyState } from "@/components/business-network/empty-state";
import { formatRelative, initials } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import type { Business, Conversation } from "@/utils/types/business";

export function ConversationList({
  conversations,
  businesses,
}: {
  conversations: Conversation[];
  businesses: Record<string, Business>;
}) {
  if (conversations.length === 0) {
    return <BusinessEmptyState icon={MessageSquare} title="No conversations yet" description="Messages with connected businesses will appear here." />;
  }

  return (
    <ul className="divide-y divide-border rounded-lg border border-border">
      {conversations.map((conv) => {
        const business = businesses[conv.businessId];
        if (!business) return null;

        return (
          <li key={conv.id}>
            <Link href={`/business/messages/${conv.id}`} className="flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30">
              <div className="relative shrink-0">
                <Avatar className="h-9 w-9 rounded-full">
                  <AvatarFallback>{initials(business.name)}</AvatarFallback>
                </Avatar>
                {conv.isRecentlyActive && (
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-success" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={`truncate text-sm ${conv.unreadCount > 0 ? "font-semibold text-foreground" : "font-medium text-foreground"}`}>
                    {business.name}
                  </p>
                  <span className="shrink-0 text-xs text-muted-foreground">{formatRelative(conv.lastMessageAt)}</span>
                </div>
                <p className="truncate text-xs text-muted-foreground">{conv.lastMessage}</p>
              </div>

              {conv.unreadCount > 0 && (
                <Badge className="shrink-0 rounded-full px-1.5 py-0 text-[10px]">{conv.unreadCount}</Badge>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}