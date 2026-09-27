"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { TaskDetail } from "@/components/tasks/task-detail";
import { TaskDetailSkeleton } from "@/components/tasks/skeletons";
import { getTaskById } from "@/data/tasks";
import { people, CURRENT_USER_ID } from "@/data/users";
import type { Task } from "@/utils/types/task";

export default function TaskDetailPage() {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<Task | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = getTaskById(params.id);
      if (!found) {
        setMissing(true);
      } else {
        // Opening the task clears its "newly assigned / unopened" indicator.
        setTask({ ...found, isUnopened: false });
      }
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [params.id]);

  if (missing) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {loading || !task ? (
        <TaskDetailSkeleton />
      ) : (
        <TaskDetail task={task} people={people} currentUserId={CURRENT_USER_ID} onUpdate={setTask} />
      )}
    </main>
  );
}
