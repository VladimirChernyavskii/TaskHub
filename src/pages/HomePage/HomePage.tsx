import { useEffect } from 'react';
import { Header } from '../../components/header/Header';
import { AddTaskForm } from '../../components/add-task-form/AddTaskForm';
import { TaskList } from '../../components/task-list/TaskList';
import styles from '../../styles/index.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useTasks } from 'src/hooks/useTasks'; 
import { useThemeStore } from '../../store/theme.store';

export const HomePage = () => {
  const { tasksQuery, addTask, deleteTask, toggleTask } = useTasks();
  const { theme, toggleTheme } = useThemeStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <main className={styles.main} data-theme={theme}>
      <Header toggleTheme={() => toggleTheme()} currentTheme={theme} />
      <AddTaskForm addTask={(title) => addTask.mutate(title)} />
      <TaskList
        tasks={tasksQuery.data || []}
        deleteTask={(id) => deleteTask.mutate(id)}
        toggleComplete={(task) => toggleTask.mutate(task)}
        filter={filter as 'all' | 'active' | 'completed'}
        onFilterChange={(newFilter) => setSearchParams({ filter: newFilter })}
      />

      {tasksQuery.error && <div style={{ color: 'red', fontWeight: 700 }}>{tasksQuery.error?.message}</div>}
    </main>
  );
};
