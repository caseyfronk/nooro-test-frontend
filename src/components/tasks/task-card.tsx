"use client";

import { Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { useMutate } from "../hooks/use-mutate";

type TaskCardProps = {
  task: { id: number; title: string; completed: boolean };
  afterChanges: () => void;
};

export function TaskCard({ task, afterChanges }: TaskCardProps) {
  const deleteTask = useMutate(`/tasks/${task.id}`, {
    method: "DELETE",
    onSuccess: () => afterChanges(),
  });
  return (
    <Card className="flex flex-row items-center gap-3 p-3">
      <Checkbox className="rounded-full" checked={task.completed} />
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
          <p className="text-muted-foreground text-sm">Created 1m ago</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={() => deleteTask.mutate()}>
        <Trash2 />
      </Button>
    </Card>
  );
}
