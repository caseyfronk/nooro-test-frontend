import { z } from "zod";
import { taskColors } from "./types";

export const taskSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Task title must contain at least 5 characters." }),
  color: z.enum(taskColors),
  completed: z.boolean(),
});
