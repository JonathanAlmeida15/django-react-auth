import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';


export default function TaskList(){
const { tasks, loading, updateTask, deleteTask } = useContext(TaskContext);


if(loading) return <p>Carregando...</p>;
if(!tasks.length) return <p>Sem tarefas.</p>;


return (
<ul>
{tasks.map(t => (
<li key={t.id}>
<h3>{t.title}</h3>
<p>{t.description}</p>
<label>
<input type="checkbox" checked={t.done} onChange={() => updateTask(t.id, { ...t, done: !t.done })} />
Concluído
</label>
<button onClick={() => deleteTask(t.id)}>Excluir</button>
</li>
))}
</ul>
)
}