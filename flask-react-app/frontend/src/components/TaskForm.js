import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function TaskForm() {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title });
    setTitle('');
  }

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Nova tarefa"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
