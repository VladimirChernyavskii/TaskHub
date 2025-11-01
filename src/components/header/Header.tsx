import styles from './Header.module.scss'
import { Text } from 'src/ui/text/Text'
import { Button } from 'src/ui/button/Button'

export const Header = () =>{
    return(
        <div className={styles.container}>
            <Text size={31} weight={800} uppercase>TaskHub</Text>
            <Button title='Сменить тему' type='secondary'/>
        </div>
    )
}