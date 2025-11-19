import { useState } from 'react';
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
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Купить хлеб', completed: false },
    { id: 2, text: 'Сделать дз', completed: true },
    { id: 3, text: 'Позвонить другу', completed: false },
    { id: 4, text: 'Помыть попу', completed: false },
  ]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      text: title,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };
  return (
    <main className={styles.main}>
      <Header></Header>
      <AddTaskForm addTask={addTask}></AddTaskForm>
      <TaskList tasks={tasks}></TaskList>
    </main>
  );
};
