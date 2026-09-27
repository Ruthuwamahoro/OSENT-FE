"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog";
import { TaskFiltersBar } from "@/components/tasks/task-filters";
import { TaskList } from "@/components/tasks/task-list";
import { TaskSummary } from "@/components/tasks/task-summary";
import { TaskListSkeleton, TaskSummarySkeleton } from "@/components/tasks/skeletons";
import { getTasks } from "@/data/tasks";
import { people, personName, CURRENT_USER_ID } from "@/data/users";
import { applyFilters, getNewlyAssigned, getSummaryCounts, getTasksForView, type TaskFilters } from "@/lib/task-queries";
import type { Task, TaskView } from "@/utils/types/task";

const EMPTY_STATES: Record<TaskView, { title: string; description: string }> = {
  my_tasks: { title: "My Tasks is clear", description: "You don't have any tasks assigned to you right now." },
  assigned_by_me: { title: "Nothing assigned yet", description: "Tasks you hand off to others will show up here." },
  created: { title: "You haven't created anything yet", description: "Tasks you create will appear here." },
  submitted_for_review: {
    title: "You haven't submitted anything for review yet",
    description: "Once you request a review, it'll show up here.",
  },
  waiting_for_my_review: {
    title: "Nothing is waiting for your review",
    description: "When someone asks you to review their work, it'll appear here.",
  },
  rejected: { title: "Nothing rejected", description: "Rejected tasks assigned to you will show up here." },
  completed: { title: "Nothing completed yet", description: "Tasks you finish or approve will be listed here." },
  all: { title: "No tasks yet", description: "Create your first task to get started." },
};

export default function TasksPage() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<TaskView>("my_tasks");
  const [filters, setFilters] = useState<TaskFilters>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(getTasks());
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const counts = useMemo(() => getSummaryCounts(tasks, CURRENT_USER_ID), [tasks]);
  const newlyAssigned = useMemo(() => getNewlyAssigned(tasks, CURRENT_USER_ID), [tasks]);

  const visibleTasks = useMemo(() => {
    const viewTasks = getTasksForView(tasks, view, CURRENT_USER_ID);
    return applyFilters(viewTasks, filters, personName);
  }, [tasks, view, filters]);

  function handleCreate(task: Task) {
    setTasks((prev) => [task, ...prev]);
  }

  const emptyState = EMPTY_STATES[view];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Tasks</h1>
          <p className="mt-1 text-sm text-muted-foreground">Keep track of work that needs your attention.</p>
        </div>
        <CreateTaskDialog people={Object.values(people)} onCreate={handleCreate} />
      </header>

      <div className="mb-6">{loading ? <TaskSummarySkeleton /> : <TaskSummary counts={counts} />}</div>

      {!loading && newlyAssigned.length > 0 && view === "my_tasks" && (
        <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Newly Assigned
          </div>
          <ul className="space-y-2">
            {newlyAssigned.map((t) => (
              <li key={t.id} className="text-sm">
                <a href={`/tasks/${t.id}`} className="font-medium text-foreground hover:underline">
                  {t.title}
                </a>
                <span className="text-muted-foreground">
                  {" "}
                  · Assigned by {personName(t.creatorId)} · Due {new Date(t.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <TaskFiltersBar
          view={view}
          onViewChange={setView}
          filters={filters}
          onFiltersChange={setFilters}
          people={Object.values(people)}
        />
      </div>

      {loading ? (
        <TaskListSkeleton />
      ) : (
        <TaskList
          tasks={visibleTasks}
          people={people}
          emptyTitle={emptyState.title}
          emptyDescription={emptyState.description}
        />
      )}
    </main>
  );
}
