"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { useMutate } from "../hooks/use-mutate";
import { formatDistanceToNow } from "date-fns";
import { Task } from "@/lib/types";
import Link from "next/link";

type TaskCardProps = {
  task: Task;
  afterChanges: () => void;
};

export function TaskCard({ task, afterChanges }: TaskCardProps) {
  const toggleCompleted = useMutate(`/tasks/${task.id}/toggle-completed`, {
    method: "PUT",
    onSuccess: () => afterChanges(),
  });

  const deleteTask = useMutate(`/tasks/${task.id}`, {
    method: "DELETE",
    onSuccess: () => afterChanges(),
  });

  return (
    <Card className="flex flex-row items-center gap-3 p-3">
      <Checkbox
        className="size-5 rounded-full hover:cursor-pointer"
        checked={task.completed}
        onCheckedChange={() =>
          toggleCompleted.mutate({ completed: !task.completed })
        }
      />

      <Link
        href={`/tasks/${task.id}`}
        className="flex flex-1 flex-col items-start gap-1 hover:cursor-pointer"
      >
        <h2
          className={cn(
            "font-light",
            task.completed && "text-muted-foreground line-through",
          )}
        >
          {task.title}
        </h2>

        <div className="flex items-center gap-3">
          <div
            style={{ backgroundColor: task.color }}
            className="size-4 rounded-full"
          />
          <p className="text-muted-foreground text-xs">
            Created{" "}
            {formatDistanceToNow(task.createdAt, {
              addSuffix: true,
              includeSeconds: true,
            })}
          </p>
        </div>
      </Link>

      <Button variant="ghost" size="icon" onClick={() => deleteTask.mutate()}>
        <Trash2 />
      </Button>
    </Card>
  );
}
