import { useState, useEffect } from 'react';
import { TaskItem } from '../task-item/TaskItem';
import styles from './TaskList.module.scss';
import { Task } from '../../App';
import { FilterPanel } from '../filter-panel/FilterPanel';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter,selectFilter } from 'src/store/filterSlice';

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
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <>
      <FilterPanel filterChange={(value) => dispatch(setFilter(value))} filter={filter}></FilterPanel>
      <section className={styles.list}>
        <AnimatePresence initial={false}>
          {tasks
            .filter((task) => {
              if (filter === 'all') return true;
              if (filter === 'active') return !task.completed;
              if (filter === 'completed') return task.completed;
            })
            .map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}>
                <TaskItem
                  key={task.id}
                  text={task.text}
                  completed={task.completed}
                  onDelete={() => deleteTask(task.id)}
                  onToggleComplete={() => toggleComplete(task.id)}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </section>
    </>
  );
};
