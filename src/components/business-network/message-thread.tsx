"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Paperclip, Send, FileText, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ConnectionStatusBadge } from "@/components/business-network/connection-badge";
import { formatRelative, initials } from "@/lib/utils";
import { contactName, MY_DISPLAY_NAME } from "@/data/business-users";
import type { Business, Message } from "@/utils/types/business";

interface MessageThreadProps {
  business: Business;
  messages: Message[];
  onSend: (body: string) => void;
}

export function MessageThread({ business, messages, onSend }: MessageThreadProps) {
  const [draft, setDraft] = useState("");
  const relatedReference = [...messages].reverse().find((m) => m.relatedReference)?.relatedReference;

  function handleSend() {
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft("");
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/business/messages" className="text-muted-foreground hover:text-foreground md:hidden">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Avatar className="h-9 w-9 rounded-full">
            <AvatarFallback>{initials(business.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <Link href={`/business/${business.id}`} className="truncate text-sm font-medium text-foreground hover:underline">
              {business.name}
            </Link>
            <div className="mt-0.5">
              <ConnectionStatusBadge status={business.connectionStatus} />
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
          <Link href={`/business/${business.id}`}>
            <ExternalLink className="h-3.5 w-3.5" />
            View Business
          </Link>
        </Button>
      </div>

      {relatedReference && (
        <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
          <FileText className="h-3.5 w-3.5" />
          Related to <span className="rounded bg-card px-1.5 py-0.5 font-mono text-[11px] text-foreground">{relatedReference}</span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((m) => {
          const isMe = m.authorId === "me";
          return (
            <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                {!isMe && <p className="px-1 text-xs font-medium text-muted-foreground">{contactName(m.authorId)}</p>}
                <div
                  className={`rounded-lg px-3 py-2 text-sm ${
                    isMe ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {m.body}
                  {m.attachments?.map((a) => (
                    <div
                      key={a.id}
                      className={`mt-2 flex items-center gap-1.5 rounded-md px-2 py-1 text-xs ${
                        isMe ? "bg-primary-foreground/10" : "bg-card"
                      }`}
                    >
                      <FileText className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{a.name}</span>
                    </div>
                  ))}
                </div>
                <p className="px-1 text-[11px] text-muted-foreground">
                  {isMe ? MY_DISPLAY_NAME : contactName(m.authorId)} · {formatRelative(m.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex items-end gap-2 border-t border-border p-3">
        <Button variant="ghost" size="icon" className="shrink-0" type="button">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Write a message…"
          rows={1}
          className="min-h-9 flex-1 resize-none"
        />
        <Button size="icon" className="shrink-0" onClick={handleSend} disabled={!draft.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}