export type Task = {
  id: number;
  title: string;
  color: TaskColor;
  completed: false;
  createdAt: Date;
  updatedAt: Date;
};

export const taskColors = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#007AFF",
  "#5856D6",
  "#AF52DE",
  "#FF2D55",
  "#A2845E",
] as const;

export type TaskColor = (typeof taskColors)[number];
