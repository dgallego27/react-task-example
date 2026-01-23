let db = null;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("tasksDB", 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("tasks")) {
        db.createObjectStore("tasks", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onerror = () => reject(request.error);
  });
};

const ensureDB = async () => {
  if (!db) {
    await initDB();
  }
  return db;
};

// ---------------- GET ----------------
export const getTasksDB = async () => {
  const database = await ensureDB();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction("tasks", "readonly");
    const store = transaction.objectStore("tasks");
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// ---------------- ADD ----------------
export const addTaskDB = async (task) => {
  const database = await ensureDB();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");
    const request = store.add(task);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error agregando tarea");
  });
};

// ---------------- UPDATE ----------------
export const updateTaskDB = async (id, updatedFields) => {
  const database = await ensureDB();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");

    const requestGet = store.get(id);

    requestGet.onsuccess = () => {
      const data = requestGet.result;
      if (!data) {
        reject("La tarea no existe");
        return;
      }

      const updated = { ...data, ...updatedFields };
      const requestPut = store.put(updated);

      requestPut.onsuccess = () => resolve();
      requestPut.onerror = () => reject("Error actualizando tarea");
    };

    requestGet.onerror = () => reject("Error obteniendo tarea");
  });
};

// ---------------- DELETE ----------------
export const deleteTaskDB = async (id) => {
  const database = await ensureDB();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Error eliminando tarea");
  });
};