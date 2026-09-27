"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Person, ReviewRequest } from "@/utils/types/task";

interface ReviewDialogProps {
  people: Person[];
  currentUserId: string;
  onSubmit: (request: ReviewRequest) => void;
}

export function RequestReviewDialog({ people, currentUserId, onSubmit }: ReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const candidates = people.filter((p) => p.id !== currentUserId);
  const [reviewerId, setReviewerId] = useState(candidates[0]?.id ?? "");
  const [message, setMessage] = useState("");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reviewerId) return;

    onSubmit({
      reviewerId,
      requestedById: currentUserId,
      message: message.trim() || "Could you take a look at this before I move ahead?",
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
      requestedAt: new Date().toISOString(),
    });
    setOpen(false);
    setMessage("");
    setDeadline("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Eye className="h-4 w-4" />
          Request Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request a review</DialogTitle>
          <DialogDescription>
            I&apos;ve finished this task — ask someone to review it before you move forward.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Reviewer</Label>
            <Select value={reviewerId} onValueChange={(value) => {
              if (value !== null) {
                setReviewerId(value);
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a reviewer" />
              </SelectTrigger>
              <SelectContent>
                {candidates.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} · {p.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="review-message">Message</Label>
            <Textarea
              id="review-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Could you please review the quantities and prices before I send this to the customer?"
              rows={3}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="review-deadline">Optional deadline</Label>
            <Input id="review-deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Send request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
