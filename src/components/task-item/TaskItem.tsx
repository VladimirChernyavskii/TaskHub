import { Text } from "src/ui/text/Text"
import { Button } from "src/ui/button/Button"

import styles from './TaskItem.module.scss'

type TaskItemProps={
    text: string,
    completed: boolean,
    onDelete: () => void,
    onToggleComplete?: () => void,
}

export const TaskItem = ({text, completed, onDelete, onToggleComplete}:TaskItemProps) =>{
    return(
        <article className={styles.container}>
            <Text weight={completed? 400:800} decoration={completed? "line-through" : 'none'}>{text}</Text>
            <div className={styles.actions}>
                {!completed && (<Button title="Выполнить" type="success" onClick={onToggleComplete}></Button>)}
                <Button title="Удалить" type="clear" onClick={onDelete}></Button>
            </div>
        </article>
    )
}