"use client";

import { useState } from "react";
import { AtSign, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatRelative, initials } from "@/lib/utils";
import type { Comment, Person } from "@/utils/types/task";

function CommentBody({ body }: { body: string }) {
  const parts = body.split(/(@[A-Za-z]+(?:\s[A-Z][a-z]+)?)/g);
  return (
    <p className="text-sm text-foreground">
      {parts.map((part, i) =>
        part.startsWith("@") ? (
          <span key={i} className="font-medium text-primary">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

function CommentItem({
  comment,
  people,
  onReply,
}: {
  comment: Comment;
  people: Record<string, Person>;
  onReply: (parentId: string, body: string) => void;
}) {
  const [replying, setReplying] = useState(false);
  const [draft, setDraft] = useState("");
  const author = people[comment.authorId];

  function submitReply() {
    if (!draft.trim()) return;
    onReply(comment.id, draft.trim());
    setDraft("");
    setReplying(false);
  }

  return (
    <div className="flex gap-3">
      <Avatar className="h-7 w-7 shrink-0">
        <AvatarFallback className="text-[10px]">{initials(author?.name ?? "?")}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-medium text-foreground">{author?.name}</p>
          <p className="text-xs text-muted-foreground">{formatRelative(comment.createdAt)}</p>
        </div>
        <div className="mt-0.5">
          <CommentBody body={comment.body} />
        </div>
        <button
          onClick={() => setReplying((r) => !r)}
          className="mt-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Reply
        </button>

        {replying && (
          <div className="mt-2 flex gap-2">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Reply to ${author?.name?.split(" ")[0]}…`}
              rows={2}
              className="text-sm"
            />
            <Button size="sm" className="h-8 shrink-0" onClick={submitReply}>
              Send
            </Button>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3 border-l border-border pl-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} people={people} onReply={onReply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function TaskComments({
  comments,
  people,
  currentUserId,
  onAddComment,
}: {
  comments: Comment[];
  people: Record<string, Person>;
  currentUserId: string;
  onAddComment: (comment: Comment) => void;
}) {
  const [draft, setDraft] = useState("");

  function insertMention(name: string) {
    setDraft((d) => (d.endsWith(" ") || d.length === 0 ? `${d}@${name} ` : `${d} @${name} `));
  }

  function handleReply(parentId: string, body: string) {
    onAddComment({
      id: `c-${Date.now()}`,
      authorId: currentUserId,
      body,
      createdAt: new Date().toISOString(),
    });
    // Note: the mock keeps replies flat in the main list rather than nesting
    // them under parentId — see the docx-style note in README for how a real
    // backend would thread these instead.
    void parentId;
  }

  function submitTopLevel() {
    if (!draft.trim()) return;
    onAddComment({
      id: `c-${Date.now()}`,
      authorId: currentUserId,
      body: draft.trim(),
      createdAt: new Date().toISOString(),
    });
    setDraft("");
  }

  return (
    <div className="space-y-5">
      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No comments yet. Start the conversation below.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} people={people} onReply={handleReply} />
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <Avatar className="h-7 w-7 shrink-0">
          <AvatarFallback className="text-[10px]">{initials(people[currentUserId]?.name ?? "?")}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a comment…"
            rows={2}
          />
          <div className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
                  <AtSign className="h-3.5 w-3.5" />
                  Mention
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {Object.values(people)
                  .filter((p) => p.id !== currentUserId)
                  .map((p) => (
                    <DropdownMenuItem key={p.id} onSelect={() => insertMention(p.name.split(" ")[0])}>
                      {p.name}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={submitTopLevel} disabled={!draft.trim()}>
              <Send className="h-3.5 w-3.5" />
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
