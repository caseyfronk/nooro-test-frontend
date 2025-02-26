"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
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
  const editTask = useMutate(`/tasks/${task.id}`, {
    method: "PUT",
    onSuccess: () => afterChanges(),
  });

  const deleteTask = useMutate(`/tasks/${task.id}`, {
    method: "DELETE",
    onSuccess: () => afterChanges(),
  });
  return (
    <Card
      className="flex flex-row items-center gap-3 p-3"
      style={{ border: `1px solid ${task.color}` }}
    >
      <Checkbox
        className="rounded-full hover:cursor-pointer"
        checked={task.completed}
        onCheckedChange={() => editTask.mutate({ completed: !task.completed })}
      />
      <div className="flex flex-1 flex-col gap-1">
        {task.completed ? (
          <Badge>Completed</Badge>
        ) : (
          <Badge variant="destructive">Incomplete</Badge>
        )}
        <h2
          className={cn(
            "text-lg",
            task.completed && "text-muted-foreground line-through",
          )}
        >
          {task.title}
        </h2>
        <div className="flex gap-3">
          <p className="text-muted-foreground text-sm">
            Created{" "}
            {formatDistanceToNow(task.createdAt, {
              addSuffix: true,
              includeSeconds: true,
            })}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/tasks/${task.id}`}>
          <Pencil />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" onClick={() => deleteTask.mutate()}>
        <Trash2 />
      </Button>
    </Card>
  );
}
