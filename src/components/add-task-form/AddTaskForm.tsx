import styles from './AddTaskForm.module.scss'
import { Button } from "src/ui/button/Button"
import { Input } from "src/ui/input/Input"

export const AddTaskForm = () =>{
    return(
        <section className={styles.container}>
            <Input placeholder='Введите задачу'></Input>
            <Button title="Добавить задачу" type="apply" ></Button>
        </section>
    )
}