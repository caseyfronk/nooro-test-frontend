import { EditTaskForm } from "@/components/tasks/edit-task-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function EditTaskPage({ params }: Params) {
  const taskId = (await params).id;

  return (
    <main className="flex flex-col gap-3 p-3">
      <Button size="icon" variant="ghost" asChild>
        <Link href="/">
          <ArrowLeft />
        </Link>
      </Button>
      {/* We need to get the taskId from the server params above */}
      <EditTaskForm taskId={taskId} />
    </main>
  );
}
