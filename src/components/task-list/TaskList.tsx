import { TaskItem } from '../task-item/TaskItem';
import styles from './TaskList.module.scss';
import { Task } from '../../App';

type TaskListProps = {
  tasks: Task[];
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void;
};

export const TaskList = ({ tasks, deleteTask, toggleComplete }: TaskListProps) => {

  return (
    <section className={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          text={task.text}
          completed={task.completed}
          onDelete={() => deleteTask(task.id)}
          onToggleComplete={() => toggleComplete(task.id)}
        />
      ))}
    </section>
  );
};
