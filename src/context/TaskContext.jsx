import { createContext, useContext, useState, useEffect } from "react";
import { addTaskDB, updateTaskDB, deleteTaskDB, getTasksDB } from "../data/db";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const stored = await getTasksDB();
      setTasks(stored);
    };
    loadTasks();
  }, []);

  const addTask = async (task) => {
    const idDB = await addTaskDB(task);
    const newTask = { ...task, id: idDB };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = async (id, updatedFields) => {
    await updateTaskDB(id, updatedFields);

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)),
    );
  };

  const deleteTask = async (id) => {
    await deleteTaskDB(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
