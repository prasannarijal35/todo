"use client";
import { useEffect, useState } from "react";

import { AddModal, EditModal } from "@/components";
import { Todo } from "@/types/todos";
import { deleteTodo, getTodo } from "@/services/todoServices";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";

export default function TodoTable() {
  const [modal, setModal] = useState<boolean>(false);

  const [refresh, setRefresh] = useState<boolean>(false);
  const [todo, setTodo] = useState<Todo | null>(null);

  // change vayuo

  const handleEditClick = (todo: Todo) => {
    setTodo(todo);
  };

  const handleCloseClick = () => {
    setTodo(null);
  };
  const refreshData = () => {
    setRefresh(!refresh);
  };

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTodo();
        setTodos(response.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchData();
  }, [refresh]);

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    refreshData();
  };

  return (
    <div className="flex items-start justify-center min-h-screen w-screen p-10">
      <div className="w-full bg-white p-5">
        <div className="flex justify-between  p-5">
          <h1 className="text-2xl">Todo List:</h1>
          <button
            className="bg-green-500 rounded-md text-white py-1 px-3 text-xl flex items-center justify-center gap-2"
            onClick={openModal}
          >
            <IoMdAdd />
            Add Todo
          </button>
        </div>
        <table className="min-w-full border border-gray-200 mt-10 ">
          <thead className="bg-gray-100">
            <tr>
              <th className=" text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b ">
                Title
              </th>
              <th className=" text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b ">
                Date
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b ">
                Description
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b ">
                Completed
              </th>
              <th className="text-left px-4 py-3 text-[16px] font-semibold text-gray-700 border-b ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo: Todo) => (
              <tr key={todo.id}>
                <td className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  {todo.title}
                </td>
                <td className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  {new Date(todo.todo_date).toLocaleString("en-GB", {
                    timeZone: "UTC",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  {todo.description}
                </td>
                <td className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  {todo.completed === true ? "yes" : "No"}
                </td>
                <td className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  <div className="flex gap-3">
                    <button
                      className="text-green-500 text-[25px]"
                      onClick={() => handleEditClick(todo)}
                    >
                      <CiEdit />
                    </button>
                    <button
                      className="text-red-500 text-[25px]"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && (
          <AddModal closeModal={closeModal} refreshData={refreshData} />
        )}
        {todo !== null && (
          <EditModal
            closeModal={handleCloseClick}
            refreshData={refreshData}
            todo={todo}
          />
        )}
      </div>
    </div>
  );
}
