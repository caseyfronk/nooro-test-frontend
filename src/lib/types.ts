export type Task = {
  id: number;
  title: string;
  completed: false;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskListData = {
  totalCount: number;
  completedCount: number;
  tasks: Task[];
};
