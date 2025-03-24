"use client";

import { Todo, TodosContextType } from "@/utils/interfaces";
import { useContext, createContext, useState, ReactNode, JSX } from "react";

const TodoContext = createContext<TodosContextType>({
  todosList: [],
  setTodosList: () => {},
});

export const TodoContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  return (
    <TodoContext.Provider value={{ todosList, setTodosList }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = (): TodosContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoContextProvider");
  }
  return context;
};
