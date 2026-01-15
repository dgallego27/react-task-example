import { use, useState, useTransition, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-10 mb-4">
        <h1 className="text-2xl font-bold mb-3 text-white">Crea tu tarea</h1>
        <input
          placeholder="Escribe la tarea"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          className="bg-slate-300 p-3 w-full mb-2"
          autoFocus
        />
        <textarea
          placeholder="Escribe la descripcion"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          className="bg-slate-300 p-3 w-full mb-2"
        />
        <button className="bg-indigo-500 px-3 py-3 w-full mb-2">Guardar</button>
      </form>
    </div>
  );
}

export default TaskForm;
