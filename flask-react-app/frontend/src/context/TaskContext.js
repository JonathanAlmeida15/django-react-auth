import { createContext, useEffect, useState } from 'react';
import api from '../api';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTasks() {
    const res = await api.get('/tasks');
    setTasks(res.data);
    setLoading(false);
  }

  async function addTask(task) {
    const res = await api.post('/tasks', task);
    setTasks(prev => [res.data, ...prev]);
  }

  async function updateTask(id, data) {
    const res = await api.put(`/tasks/${id}`, data);
    setTasks(prev =>
      prev.map(t => (t.id === id ? res.data : t))
    );
  }

  async function deleteTask(id) {
    await api.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, loading, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
