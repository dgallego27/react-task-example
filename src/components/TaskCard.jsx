import { useTasks } from "../context/TaskContext";
import { useState } from "react";

function TaskCard({ task }) {
  const { deleteTask, updateTask } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    updateTask(task.id, {
      title,
      description,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md">
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-300 text-black p-1 rounded w-full mb-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-300 text-black p-1 rounded w-full"
          />
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold capitalize">{task.title}</h1>
          <p className="text-gray-500 text-sm">{task.description}</p>
        </>
      )}

      <button
        className="bg-red-500 px-2 py-1 rounded-md mt-4 hover:bg-red-400"
        onClick={() => deleteTask(task.id)}
      >
        Eliminar
      </button>

      <button
        className="bg-yellow-500 px-2 py-1 rounded-md mt-2 mr-2 hover:bg-yellow-400"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "Cancelar" : "Editar"}
      </button>

      {isEditing && (
        <button
          onClick={handleSave}
          className="bg-green-500 px-2 py-1 rounded-md mt-2 hover:bg-green-400"
        >
          Guardar
        </button>
      )}
    </div>
  );
}

export default TaskCard;
