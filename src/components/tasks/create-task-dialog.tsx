"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TYPE_LABELS } from "@/components/tasks/meta";
import { CURRENT_USER_ID } from "@/data/users";
import type { Task, TaskPriority, TaskType, Person }  from "@/utils/types/task";

interface CreateTaskDialogProps {
  people: Person[];
  onCreate: (task: Task) => void;
}

const emptyForm = {
  title: "",
  description: "",
  type: "general" as TaskType,
  assigneeId: CURRENT_USER_ID,
  priority: "medium" as TaskPriority,
  dueDate: "",
  relatedLabel: "",
  reference: "",
  notes: "",
};

export function CreateTaskDialog({ people, onCreate }: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function update<K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;

    const now = new Date();
    const due = form.dueDate ? new Date(form.dueDate).toISOString() : new Date(now.getTime() + 86_400_000).toISOString();
    const id = `t-new-${Date.now()}`;

    const task: Task = {
      id,
      reference: form.reference.trim() || `TSK-2026-${Math.floor(1000 + Math.random() * 8999)}`,
      title: form.title.trim(),
      description: form.description.trim() || "No description provided.",
      type: form.type,
      status: "new",
      priority: form.priority,
      assigneeId: form.assigneeId,
      creatorId: CURRENT_USER_ID,
      createdAt: now.toISOString(),
      dueDate: due,
      lastActivityAt: now.toISOString(),
      isUnopened: form.assigneeId !== CURRENT_USER_ID,
      relatedTo: form.relatedLabel.trim()
        ? { type: "customer", id: form.reference.trim() || "REF", label: form.relatedLabel.trim() }
        : undefined,
      activity: [
        { id: "a1", kind: "created", actorId: CURRENT_USER_ID, createdAt: now.toISOString(), message: "created this task." },
        ...(form.assigneeId !== CURRENT_USER_ID
          ? [{ id: "a2", kind: "assigned" as const, actorId: CURRENT_USER_ID, createdAt: now.toISOString(), message: `assigned this task to ${people.find((p) => p.id === form.assigneeId)?.name ?? "someone"}.` }]
          : []),
      ],
      comments: form.notes.trim()
        ? [{ id: "c1", authorId: CURRENT_USER_ID, body: form.notes.trim(), createdAt: now.toISOString() }]
        : [],
    };

    onCreate(task);
    setForm(emptyForm);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
          <DialogDescription>Add a piece of work and assign it to someone on your team.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Task title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Prepare PO for ABC Traders"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="What needs to happen, and any context the assignee should know."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Task type</Label>
              <Select value={form.type} onValueChange={(v) => update("type", v as TaskType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TYPE_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Priority</Label>
              <Select value={form.priority} onValueChange={(v) => update("priority", v as TaskPriority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Assign to</Label>
              <Select value={form.assigneeId} onValueChange={(v) => update("assigneeId", v as string)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {people.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="dueDate">Due date</Label>
              <Input id="dueDate" type="date" value={form.dueDate} onChange={(e) => update("dueDate", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="related">Related business object</Label>
              <Input
                id="related"
                value={form.relatedLabel}
                onChange={(e) => update("relatedLabel", e.target.value)}
                placeholder="e.g. Kigali Hardware Ltd"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reference">Reference (optional)</Label>
              <Input
                id="reference"
                value={form.reference}
                onChange={(e) => update("reference", e.target.value)}
                placeholder="e.g. PO-2026-0142"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">Additional notes</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Anything else worth mentioning up front."
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
