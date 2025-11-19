import { TaskItem } from '../task-item/TaskItem';
import styles from './TaskList.module.scss';

import { Task } from '../../App';

export const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const handleDelete = (id: number) => {
    console.log('Удаляем задачу', id);
    // пока просто лог, потом сделаем setTasks(tasks.filter(...))
  };

  const handleToggleComplete = (id: number) => {
    console.log('Меняем статус задачи', id);
    // потом обновим completed
  };

  return (
    <section className={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          text={task.text}
          completed={task.completed}
          onDelete={() => handleDelete(task.id)}
          onToggleComplete={() => handleToggleComplete(task.id)}
        />
      ))}
    </section>
  );
};
