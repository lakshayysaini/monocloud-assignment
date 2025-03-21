export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export interface TodosContextType {
  todosList: Todo[];
  setTodosList: (todos: Todo[]) => void;
}
