import { useState } from 'react';
import { TaskItem } from '../task-item/TaskItem';
import styles from './TaskList.module.scss';
import { Task } from '../../App';
import { FilterPanel } from '../filter-panel/FilterPanel';

type TaskListProps = {
  tasks: Task[];
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void;
};

export const TaskList = ({
  tasks,
  deleteTask,
  toggleComplete,
}: TaskListProps) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  return (
    <>
      <FilterPanel filterChange={setFilter}></FilterPanel>
      <section className={styles.list}>
        {tasks
          .filter((task) => {
            if (filter === 'all') return true;
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
          })
          .map((task) => (
            <TaskItem
              key={task.id}
              text={task.text}
              completed={task.completed}
              onDelete={() => deleteTask(task.id)}
              onToggleComplete={() => toggleComplete(task.id)}
            />
          ))}
      </section>
    </>
  );
};
