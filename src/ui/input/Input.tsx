import styles from './Input.module.scss';
import { Text } from '../text/Text';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
}

export const Input = ({ placeholder, value, onChange, label }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      {label && <Text>{label}</Text>}
      <input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}></input>
    </div>
  );
};
