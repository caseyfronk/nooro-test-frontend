export type Task = {
  id: number;
  title: string;
  color: TaskColor;
  completed: false;
  createdAt: Date;
  updatedAt: Date;
};

export const taskColors = ["crimson", "seagreen", "slateblue"] as const;

export type TaskColor = (typeof taskColors)[number];
