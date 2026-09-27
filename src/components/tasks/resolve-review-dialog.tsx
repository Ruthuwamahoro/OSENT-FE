"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import type { ReviewOutcome } from "@/utils/types/task";

interface ReviewActionsProps {
  reviewerId: string;
  onResolve: (outcome: ReviewOutcome) => void;
}

function ReasonDialog({
  trigger,
  title,
  description,
  placeholder,
  actionLabel,
  variant,
  onConfirm,
}: {
  trigger: React.ReactNode;
  title: string;
  description: string;
  placeholder: string;
  actionLabel: string;
  variant: "destructive" | "default";
  onConfirm: (reason: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  function handleConfirm() {
    if (!reason.trim()) return;
    onConfirm(reason.trim());
    setOpen(false);
    setReason("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-1.5">
          <Label htmlFor="reason">Comment</Label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={placeholder}
            rows={3}
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" variant={variant} onClick={handleConfirm} disabled={!reason.trim()}>
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ReviewActions({ reviewerId, onResolve }: ReviewActionsProps) {
  function resolve(outcome: ReviewOutcome["outcome"], reason?: string) {
    onResolve({ outcome, reviewerId, reason, decidedAt: new Date().toISOString() });
  }

  return (
    <div className="space-y-3 rounded-lg border border-warning/30 bg-warning/5 p-4">
      <p className="text-sm font-medium text-foreground">You&apos;ve been asked to review this task.</p>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" className="gap-1.5" onClick={() => resolve("approved")}>
          <Check className="h-4 w-4" />
          Approve
        </Button>
        <ReasonDialog
          trigger={
            <Button size="sm" variant="outline" className="gap-1.5">
              <RotateCcw className="h-4 w-4" />
              Request Changes
            </Button>
          }
          title="Request changes"
          description="Explain what needs to be updated before this can move forward."
          placeholder="Please correct the supplier name and update the delivery date."
          actionLabel="Request changes"
          variant="default"
          onConfirm={(reason) => resolve("changes_requested", reason)}
        />
        <ReasonDialog
          trigger={
            <Button size="sm" variant="outline" className="gap-1.5 text-destructive hover:text-destructive">
              <X className="h-4 w-4" />
              Reject
            </Button>
          }
          title="Reject task"
          description="Let the assignee know why this can't be accepted as submitted."
          placeholder="The attached document does not match the customer's request."
          actionLabel="Reject task"
          variant="destructive"
          onConfirm={(reason) => resolve("rejected", reason)}
        />
      </div>
    </div>
  );
}
