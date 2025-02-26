import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { TaskList } from "@/components/tasks/task-list";

export default async function Home() {
  return (
    <main className="flex flex-col gap-3 p-3">
      <Button className="w-full" asChild>
        <Link href="/tasks/create">
          <span>Create Task</span>
          <PlusCircle className="size-3.5" />
        </Link>
      </Button>
      <TaskList />
    </main>
  );
}
