"use client";
import { updateTodo } from "@/services/todoServices";
import { Todo } from "@/types/todos";
import { useState } from "react";

export default function EditModal({
  closeModal,
  refreshData,
  todo,
}: {
  closeModal: () => void;
  refreshData: () => void;
  todo: Todo;
}) {
  const [title, setTitle] = useState<string>(todo.title);
  const [date, setDate] = useState<string>(todo.todo_date.slice(0, 10));
  const [completed, setCompleted] = useState<boolean>(todo.completed);
  const [description, setDescription] = useState<string>(todo.description);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }
    if (e.target.name === "date") {
      setDate(e.target.value);
    }
    if (e.target.name === "completed") {
      setCompleted(e.target.value === "true" ? true : false);
    }
    if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const sendData = {
        title: title,
        description: description,
        date: date,
        completed: completed,
      };
      await updateTodo(sendData, todo.id);
      setTitle("");
      setCompleted(false);
      setDescription("");
      setDate("");
      refreshData();
      closeModal();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen flex item justify-center items-start fixed inset-0 backdrop-blur-sm">
      <div className="fixed h-screen w-screen bg-black opacity-50 z-[9]"></div>
      <div className=" fixed w-full max-w-[700px] rounded-md bg-white p-5 z-[10] mt-4">
        <div className="flex justify-between p-2">
          <h1 className="font-semibold text-xl ">Edit todo</h1>
          <button
            className="bg-red-400 rounded-md text-red px-4 py-1"
            onClick={closeModal}
          >
            X
          </button>
        </div>
        <div>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                defaultValue={title}
                onChange={handleChange}
                className="px-4 w-full border border-gray-300 rounded-md focus:border-green-500 outline-none h-[45px] mb-3"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={date}
                  onChange={handleChange}
                  className="px-4 w-full border border-gray-300 rounded-md focus:border-green-500 outline-none h-[45px] mn-3"
                />
              </div>
              <div>
                <label htmlFor="">Completed</label>
                <select
                  name="completed"
                  defaultValue={completed ? "yes" : "No"}
                  onChange={handleChange}
                  className="px-4 w-full border border-gray-300 rounded-md focus:border-green-500 outline-none h-[45px] "
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="w-full ">
              <label htmlFor="">Description</label>
              <textarea
                name="description"
                defaultValue={description}
                className="px-4 w-full border border-gray-300 rounded-md focus:border-green-500 outline-none "
                rows={5}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex items-center justify-end mt-2">
              <button
                className=" bg-green-500 text-white py-2 rounded-md px-7"
                type="submit"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
