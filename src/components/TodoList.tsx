"use client";

import { useState, useEffect, JSX } from "react";
import { useTodos } from "@/context/TodoContext";
import { Todo } from "@/utils/interfaces";

interface TodoListProps {
  initiaTodos: Todo[];
}

const TodoList = ({ initiaTodos }: TodoListProps): JSX.Element => {
  const todosContext = useTodos();
  const pageSize: number = 7;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages: number = Math.ceil(
    todosContext.todosList.length / pageSize
  );

  const paginatedTodos: Todo[] = todosContext.todosList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    todosContext.setTodosList(initiaTodos);
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
              <div className="flex items-center space-x-2 mr-[2rem]">
                <span className="font-medium text-black">{serialNumber}.</span>
                <span className="font-medium text-black">{todo.title}</span>
              </div>
              {todo.completed ? (
                <div className="bg-green-200 p-2 rounded">
                  <span className="text-green-800 font-medium">Completed</span>
                </div>
              ) : (
                <div className="bg-red-200 p-2 rounded">
                  <span className="text-red-800 font-medium">
                    Not Completed
                  </span>
                </div>
              )}
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
