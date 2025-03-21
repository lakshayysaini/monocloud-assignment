"use client";

import { Todo, TodosContextType } from "@/utils/interfaces";
import { useContext, createContext, useState, ReactNode } from "react";

const TodoContext = createContext<TodosContextType>({
  todosList: [],
  setTodosList: () => {},
});

export const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  return (
    <TodoContext.Provider value={{ todosList, setTodosList }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
//   console.log("context inside useTodos", context);

  if (!context) return;
  return context;
};
