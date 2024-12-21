import { TodoType } from "@/types/todos";
import axios from "axios";
export const getTodo = async () => {
  const response = await axios.get("http://192.168.1.113:8000/api/todos");
  return response.data;
};

export const sendTodo = async (todo: TodoType) => {
  const response = await axios.post("http://192.168.1.113:8000/api/todos", {
    title: todo.title,
    todo_date: todo.date,
    description: todo.description,
    completed: todo.completed,
  });
  return response.data;
};

export const updateTodo = async (todo: TodoType, id: number) => {
  const response = await axios.put(
    `http://192.168.1.113:8000/api/todos/${id}`,
    {
      title: todo.title,
      todo_date: todo.date,
      description: todo.description,
      completed: todo.completed,
    }
  );
  return response.data;
};
export const deleteTodo = async (id: number) => {
  const response = await axios.delete(
    `http://192.168.1.113:8000/api/todos/${id}`
  );
  return response.data;
};
