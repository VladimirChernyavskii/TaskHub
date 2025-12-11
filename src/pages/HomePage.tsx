import { useEffect } from 'react';
import { Header } from '../components/header/Header';
import { AddTaskForm } from '../components/add-task-form/AddTaskForm';
import { TaskList } from '../components/task-list/TaskList';
import styles from '../styles/index.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '../store/store';
import {
  fetchTasks,
  addTaskThunk,
  deleteTaskThunk,
  toggleTaskThunk,
  selectTasks,
  selectError,
} from '../store/tasksSlice';
import { toggleTheme, selectTheme } from '../store/themeSlice';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const tasks = useSelector(selectTasks);
  const theme = useSelector(selectTheme);
  const error = useSelector(selectError);

  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all'; // если нет — по умолчанию all


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <main className={styles.main} data-theme={theme}>
        <Header
            toggleTheme={() => dispatch(toggleTheme())}
            currentTheme={theme}
        />
        <AddTaskForm addTask={(title) => dispatch(addTaskThunk(title))} />
        <TaskList
            tasks={tasks}
            deleteTask={(id) => dispatch(deleteTaskThunk(id))}
            toggleComplete={(id) => dispatch(toggleTaskThunk(id))}
            filter={filter as 'all' | 'active' | 'completed'}
            onFilterChange={(newFilter) => setSearchParams({ filter: newFilter })}
        />

        {error && <div style={{ color: 'red', fontWeight: 700 }}>{error}</div>}
    </main>
  );
};
