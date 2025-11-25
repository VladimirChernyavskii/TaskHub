import { useState, useEffect } from 'react';
import { Header } from './components/header/Header';
import { AddTaskForm } from './components/add-task-form/AddTaskForm';
import { TaskList } from './components/task-list/TaskList';

import styles from './styles/index.module.scss';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() =>{
    fetch('https://render-production-644d.up.railway.app/tasks')
    .then(res => res.json())
    .then(data => setTasks(data))
  }, [])

  const deleteTask = (id: number) => {
    fetch(`https://render-production-644d.up.railway.app/tasks/${id}`,{
      method: 'DELETE',
    })
    .then(() =>{
      setTasks(prev => prev!.filter(task => task.id !== id))
    })
  };

  const toggleComplete = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    fetch(`https://render-production-644d.up.railway.app/tasks/${id}`,{
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({completed: !task.completed})
    })
    .then(res => res.json())
    .then(updatedTask => {
      setTasks(prev =>
        prev!.map(t => (t.id === id ? updatedTask : t))
      );
    });
  };

  const addTask = (title: string) => {
    fetch('https://render-production-644d.up.railway.app/tasks',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: title, completed: false })
    })
    .then(res => res.json())
    .then(newTask => setTasks(prev => [...prev, newTask]));
  };
  return (
    <main className={styles.main}>
      <Header></Header>
      <AddTaskForm addTask={addTask}></AddTaskForm>
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}></TaskList>
    </main>
  );
};
