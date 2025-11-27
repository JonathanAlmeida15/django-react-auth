import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';


function App(){
return (
<TaskProvider>
<div className="container">
<h1>Gerenciador de Tarefas</h1>
<TaskForm />
<TaskList />
</div>
</TaskProvider>
)
}


export default App;