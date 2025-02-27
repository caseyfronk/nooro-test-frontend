"use client";

import { useMemo } from "react";
import { useQuery } from "../hooks/use-query";
import { Task } from "@/lib/types";
import { TaskCard } from "./task-card";
import { Badge } from "../ui/badge";
import { ClipboardList } from "lucide-react";

export function TaskList() {
  const tasks = useQuery<Task[]>("/tasks");

  // Normally I would build out true pagination
  // and retrive these counts from the database
  const totalCount = useMemo(() => tasks.data?.length || 0, [tasks.data]);

  const completedCount = useMemo(() => {
    if (!tasks.data) {
      return 0;
    }

    return tasks.data.filter((task) => task.completed).length;
  }, [tasks.data]);

  return (
    <div className="flex flex-1 flex-col gap-3 pt-12">
      <div className="flex justify-between">
        <div className="flex gap-1">
          <p className="text-primary">Tasks</p>
          <Badge className="bg-card">{totalCount}</Badge>
        </div>
        <div className="flex gap-1">
          <p className="text-secondary">Completed</p>
          <Badge className="bg-card">
            {completedCount} of {totalCount}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col gap-3 overflow-auto">
        {Array.isArray(tasks.data) && tasks.data.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center gap-3 pt-24">
            <ClipboardList className="text-muted size-20" />
            <p className="font-semibold">
              You don&apos;t have any tasks registered yet.
            </p>
            <p className="font-light">
              Create tasks and organize your to-do items.
            </p>
          </div>
        ) : (
          tasks.data?.map((task) => (
            <TaskCard key={task.id} task={task} afterChanges={tasks.refetch} />
          ))
        )}
      </div>
    </div>
  );
}
