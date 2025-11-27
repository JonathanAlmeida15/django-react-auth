import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';


export default function TaskForm(){
const { addTask } = useContext(TaskContext);
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');


const submit = async (e) => {
e.preventDefault();
if(!title) return;
await addTask({ title, description });
setTitle(''); setDescription('');
}


return (
<form onSubmit={submit}>
<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título" />
<input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Descrição (opcional)" />
<button type="submit">Adicionar</button>
</form>
)
}