import { useState } from "react";
import { TaskItem } from "../task-item/TaskItem";
import styles from "./TaskList.module.scss";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export const TaskList = () =>{
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, text: "Купить хлеб", completed: false },
        { id: 2, text: "Сделать дз", completed: true },
        { id: 3, text: "Позвонить другу", completed: false },
        { id: 4, text: "Помыть попу", completed: false },
    ]);

    const handleDelete = (id: number) => {
        console.log("Удаляем задачу", id);
        // пока просто лог, потом сделаем setTasks(tasks.filter(...))
    };

    const handleToggleComplete = (id: number) => {
        console.log("Меняем статус задачи", id);
        // потом обновим completed
    };


    return(
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
    )
}