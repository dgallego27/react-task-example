import { useTasks } from "../context/TaskContext";
import { useState } from "react";
import RichTextEditor from "./RichTextEditor";

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

  const handleEdit = () => {
    // Resetear los valores cuando entramos en modo edición
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(true);
  };

  return (
    <div className="bg-gray-800 text-white p-5 rounded-xl h-min w-auto flex-col">
      {isEditing ? (
        <>         
          <RichTextEditor
            value={title}
            onChange={setTitle}
            placeholder="Título de la tarea"
          />
          
          <RichTextEditor
            value={description}
            onChange={setDescription}
            placeholder="Descripción de la tarea"
          />
        </>
      ) : (
        <>
          <h1
            className="text-xl font-bold capitalize"
            dangerouslySetInnerHTML={{ __html: task.title }}
          />

          <p
            className="text-gray-400 text-sm mt-2"
            dangerouslySetInnerHTML={{ __html: task.description }}
          />
        </>
      )}

      <div className="flex min-h pt-3 mb-auto">
      <button
        className="bg-red-500 px-2 py-1 rounded-md mt-2 mr-2 hover:bg-red-400"
        onClick={() => deleteTask(task.id)}
      >
        Eliminar
      </button>

      <button
        className="bg-yellow-500 px-2 py-1 rounded-md mt-2 mr-2 hover:bg-yellow-400"
        onClick={handleEdit}
      >
        {isEditing ? "Cancelar" : "Editar"}
      </button>

      {isEditing && (
        <button
          onClick={handleSave}
          className="bg-green-500 px-2 py-1 rounded-md mt-2 mr-2 hover:bg-green-400"
        >
          Guardar
        </button>
      )}
      </div>
    </div>
  );
}

export default TaskCard;