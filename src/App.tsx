import { useState, useEffect } from 'react';
import { Header } from './components/header/Header';
import { AddTaskForm } from './components/add-task-form/AddTaskForm';
import { TaskList } from './components/task-list/TaskList';
import styles from './styles/index.module.scss';
import { tasksApi } from './api/tasksApi';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await tasksApi.getAll();
        setTasks(data);
      } catch {
        setError(
          'Не удалось загрузить задачи. Проверь, запущена ли база данных.'
        );
      }
    };

    loadTasks();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const deleteTask = async (id: number) => {
    await tasksApi.delete(id);
    setTasks((prev) => prev!.filter((task) => task.id !== id));
  };

  const toggleComplete = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updated = await tasksApi.toggle(id, !task.completed)
    
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? updated : t))
    );
  };

  const addTask = async (title: string) => {
    const newTask = await tasksApi.create(title);
    setTasks((prev) => [...prev, newTask]);
  };
  return (
    <main className={styles.main} data-theme={theme}>
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      <AddTaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />

      {error && <div style={{ color: 'red', fontWeight: 700 }}>{error}</div>}
    </main>
  );
};
