"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutate } from "../hooks/use-mutate";
import { taskColors } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { ColorPicker } from "./color-picker";
import { useRouter } from "next/navigation";

const taskSchema = z.object({
  title: z.string().min(5),
  color: z.enum(taskColors),
  completed: z.boolean(),
});

export function CreateTaskForm() {
  const router = useRouter();

  const createTask = useMutate("/tasks", {
    method: "POST",
    onSuccess: () => router.push("/"),
  });

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      color: "#FF3B30",
      completed: false,
    },
  });

  function onSubmit(values: z.infer<typeof taskSchema>) {
    createTask.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <ColorPicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isDirty}>
          Create Task
          <Check className="size-3.5 stroke-3" />
        </Button>
      </form>
    </Form>
  );
}
