import {Header} from './components/header/Header'
import {AddTaskForm} from './components/add-task-form/AddTaskForm'
import {TaskList} from './components/task-list/TaskList'

import styles from './styles/index.module.scss'

export const App =() => {
    return(
        <main className={styles.main}>
            <Header></Header>
            <AddTaskForm></AddTaskForm>
            <TaskList></TaskList>
        </main>
        
    )
}