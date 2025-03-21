"use client";

import { useState, useEffect } from "react";
import { useTodos } from "@/context/TodoContext";
import { Todo } from "@/utils/interfaces";
import GreenTick from "@/assets/icons/green-tick";
import RedCross from "@/assets/icons/red-cross";

const TodoList = ({ initiaTodos }: { initiaTodos: Todo[] }) => {
  const todosContext = useTodos();
  const pageSize: number = 7;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages: number = todosContext?.todosList
    ? Math.ceil(todosContext.todosList.length / pageSize)
    : 0;

  const paginatedTodos: Todo[] = todosContext?.todosList
    ? todosContext.todosList.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      )
    : [];

  useEffect(() => {
    if (todosContext) {
      todosContext.setTodosList(initiaTodos);
    }
  }, [initiaTodos, todosContext]);

  return (
    <div>
      <ul className="space-y-4">
        {paginatedTodos.map((todo, index) => {
          const serialNumber = (currentPage - 1) * pageSize + index + 1;
          return (
            <li
              key={todo.id}
              className="p-2 flex items-center justify-between rounded-lg shadow-md bg-white"
            >
              <div className="flex items-center space-x-2 mr-4">
                <span className="font-medium text-black">{serialNumber}.</span>
                <span className="font-medium text-black">{todo.title}</span>
              </div>
              {todo.completed ? <GreenTick /> : <RedCross />}
            </li>
          );
        })}
      </ul>

      <div className="flex justify-center mt-6 space-x-2">
        <button
          className="inline-block rounded-sm border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="px-4 py-2">
          {currentPage} / {totalPages}
        </span>

        <button
          className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoList;
