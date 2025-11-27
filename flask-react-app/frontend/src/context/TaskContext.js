import React, { createContext, useState, useEffect } from 'react';
import api from '../api';


export const TaskContext = createContext();


export const TaskProvider = ({ children }) => {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => { fetchTasks(); }, []);


const fetchTasks = async () => {
setLoading(true);
const res = await api.get('/tasks');
setTasks(res.data);
setLoading(false);
};


const addTask = async (task) => {
const res = await api.post('/tasks', task);
setTasks(prev => [res.data, ...prev]);
};


const updateTask = async (id, data) => {
const res = await api.put(`/tasks/${id}`, data);
setTasks(prev => prev.map(t => (t.id === id ? res.data : t)));
};


const deleteTask = async (id) => {
await api.delete(`/tasks/${id}`);
setTasks(prev => prev.filter(t => t.id !== id));
};


return (
<TaskContext.Provider value={{ tasks, loading, addTask, updateTask, deleteTask }}>
{children}
</TaskContext.Provider>
);
};