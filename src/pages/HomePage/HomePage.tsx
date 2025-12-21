import { useEffect } from 'react';
import { Header } from '../../components/header/Header';
import { AddTaskForm } from '../../components/add-task-form/AddTaskForm';
import { TaskList } from '../../components/task-list/TaskList';
import styles from '../../styles/index.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useTasksStore } from 'src/store/tasks.store';
import { useThemeStore } from '../../store/theme.store';

export const HomePage = () => {
  const {tasks, error, loading, fetchTasks, addTask, deleteTask, toggleTask} = useTasksStore();
  const {theme, toggleTheme} = useThemeStore();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all'; 

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <main className={styles.main} data-theme={theme}>
      <Header
        toggleTheme={() => toggleTheme()}
        currentTheme={theme}
      />
      <AddTaskForm addTask={(title) => addTask(title)} />
      <TaskList
        tasks={tasks}
        deleteTask={(id) => deleteTask(id)}
        toggleComplete={(id) => toggleTask(id)}
        filter={filter as 'all' | 'active' | 'completed'}
        onFilterChange={(newFilter) => setSearchParams({ filter: newFilter })}
      />

      {error && <div style={{ color: 'red', fontWeight: 700 }}>{error}</div>}
    </main>
  );
};
