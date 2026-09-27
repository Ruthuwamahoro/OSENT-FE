"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TYPE_LABELS, STATUS_META, PRIORITY_META } from "@/components/tasks/meta";
import type { TaskFilters as TaskFiltersState } from "@/lib/task-queries";
import type { Person, TaskView } from "@/utils/types/task";

const VIEWS: { value: TaskView; label: string }[] = [
  { value: "my_tasks", label: "My Tasks" },
  { value: "assigned_by_me", label: "Assigned by Me" },
  { value: "created", label: "Created" },
  { value: "submitted_for_review", label: "Submitted for Review" },
  { value: "waiting_for_my_review", label: "Waiting for My Review" },
  { value: "rejected", label: "Rejected" },
  { value: "completed", label: "Completed" },
  { value: "all", label: "All Tasks" },
];

interface TaskFiltersProps {
  view: TaskView;
  onViewChange: (view: TaskView) => void;
  filters: TaskFiltersState;
  onFiltersChange: (filters: TaskFiltersState) => void;
  people: Person[];
}

export function TaskFiltersBar({ view, onViewChange, filters, onFiltersChange, people }: TaskFiltersProps) {
  const activeFilterCount = Object.values(filters).filter((v) => v && v !== "").length - (filters.search ? 1 : 0);

  function update<K extends keyof TaskFiltersState>(key: K, value: TaskFiltersState[K]) {
    onFiltersChange({ ...filters, [key]: value });
  }

  function clearFilters() {
    onFiltersChange({ search: filters.search });
  }

  return (
    <div className="space-y-3">
      <Tabs value={view} onValueChange={(v) => onViewChange(v as TaskView)}>
        <TabsList>
          {VIEWS.map((v) => (
            <TabsTrigger key={v.value} value={v.value}>
              {v.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={filters.search ?? ""}
            onChange={(e) => update("search", e.target.value)}
            placeholder="Search tasks, people, references…"
            className="pl-8"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={filters.status ?? "any"} onValueChange={(v) => update("status", v === "any" ? undefined : (v as TaskFiltersState["status"]))}>
            <SelectTrigger className="h-8 w-[9.5rem] text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any status</SelectItem>
              {Object.entries(STATUS_META).map(([key, meta]) => (
                <SelectItem key={key} value={key}>
                  {meta.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.priority ?? "any"} onValueChange={(v) => update("priority", v === "any" ? undefined : (v as TaskFiltersState["priority"]))}>
            <SelectTrigger className="h-8 w-[8rem] text-xs">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any priority</SelectItem>
              {Object.entries(PRIORITY_META).map(([key, meta]) => (
                <SelectItem key={key} value={key}>
                  {meta.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.type ?? "any"} onValueChange={(v) => update("type", v === "any" ? undefined : (v as TaskFiltersState["type"]))}>
            <SelectTrigger className="h-8 w-[8.5rem] text-xs">
              <SelectValue placeholder="Task type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any type</SelectItem>
              {Object.entries(TYPE_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.assigneeId ?? "any"} onValueChange={(v) => update("assigneeId", v as string)}>
            <SelectTrigger className="h-8 w-[9rem] text-xs">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any assignee</SelectItem>
              {people.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-muted-foreground" onClick={clearFilters}>
              <X className="h-3.5 w-3.5" />
              Clear filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export { SlidersHorizontal as FiltersIcon };
