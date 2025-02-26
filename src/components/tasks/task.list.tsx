"use client";

import { useMemo } from "react";
import { useQuery } from "../hooks/use-query";
import { Task } from "@/lib/types";
import { TaskCard } from "./task-card";
import { Badge } from "../ui/badge";

export function TaskList() {
  const tasks = useQuery<Task[]>("/tasks");

  const totalCount = useMemo(() => tasks.data?.length || 0, [tasks.data]);

  const completedCount = useMemo(() => {
    if (!tasks.data) {
      return 0;
    }

    return tasks.data.filter((task) => task.completed).length;
  }, [tasks.data]);

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex gap-1">
          <p className="text-primary">Tasks</p>
          <Badge variant="outline">{totalCount}</Badge>
        </div>
        <div className="flex gap-1">
          <p>Completed</p>
          <Badge variant="outline">{completedCount}</Badge>
        </div>
      </div>
      <div className="flex flex-col gap-3 overflow-auto">
        {tasks.data?.map((task) => (
          <TaskCard key={task.id} task={task} afterChanges={tasks.refetch} />
        ))}
      </div>
    </div>
  );
}
