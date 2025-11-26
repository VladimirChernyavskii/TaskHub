import styles from './Header.module.scss';
import { Text } from 'src/ui/text/Text';
import { Button } from 'src/ui/button/Button';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: 'light' | 'dark';
}

export const Header = ({ toggleTheme, currentTheme }: HeaderProps) => {
  return (
    <div className={styles.container}>
      <Text size={31} weight={800} uppercase>
        TaskHub
      </Text>
      <Button
        icon={
          currentTheme === 'light' ? (
            <Moon size={30} color='black' />
          ) : (
            <Sun size={30} color='black' />
          )
        }
        type='secondary'
        onClick={toggleTheme}
      />
    </div>
  );
};
