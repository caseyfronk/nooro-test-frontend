import { CreateTaskForm } from "@/components/tasks/create-task-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateTaskPage() {
  return (
    <main className="flex flex-col gap-3 p-3">
      <Button size="icon" variant="ghost" asChild>
        <Link href="/">
          <ArrowLeft />
        </Link>
      </Button>
      <CreateTaskForm />
    </main>
  );
}
