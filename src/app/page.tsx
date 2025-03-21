import Image from "next/image";
import { fetchTodos } from "@/api/fetchTodos";
import TodoList from "@/components/TodoList";
import { useTodos } from "@/context/TodoContext";

const Home = async () => {
  const initiaTodos = await fetchTodos();

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-4 bg-[#0a0a0a] h-[100vh]">
      <h1 className="text-2xl">MonoCloud Interview Assignment</h1>
      <TodoList initiaTodos={initiaTodos} />
    </div>
  );
};

export default Home;
