import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import RichTextEditor from "./RichTextEditor";


function TaskForm() {
  const [title, setTitle] = useState("");
  const [responsable, setResponsable] = useState("");
  const [description, setDescription] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, responsable, description });
    setTitle("");
    setResponsable("");
    setDescription("");
  };

  return (
    <div className="max-w-max mx-max box-borde">
      <form onSubmit={handleSubmit} className="p-10 mb-2 bg-gray-800 rounded-xl" >
        <h1 className="flex min-h-24 items-center justify-center text-2xl font-bold mb-3 text-white ">Crea tu tarea</h1>

        <RichTextEditor    
          placeholder="Escribe la tarea"
          onChange={(html) => setTitle(html)}
          value={title}
          className="bg-slate-950 p-2 w-3 "
        />

        <div className="border rounded bg-white text-black p-3 mb-3 text-base">
          <input
            type="text"
            placeholder="Escribe el responsable"
            value={responsable}
            onChange={(e) => setResponsable(e.target.value)}
            className="w-full bg-transparent outline-none text-base"
          />
        </div>

        <RichTextEditor
          placeholder="Escribe la descripcion"
          onChange={(html) => setDescription(html)}
          value={description}
          className="bg-slate-300 p-2 w-3"
        />

        <button className="bg-[#5B55A0] rounded-xl px-30 py-2">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
