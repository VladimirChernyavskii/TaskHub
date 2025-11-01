import styles from './Input.module.scss'
import { Text } from '../text/Text'

export const Input = ({placeholder}:{placeholder?:string}) =>{
    return(
        <div className={styles.wrapper}>
            <Text>Введите задачу</Text>
            <input className={styles.input} placeholder={placeholder}></input>
        </div>
    )
}