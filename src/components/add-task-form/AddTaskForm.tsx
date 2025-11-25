import styles from './AddTaskForm.module.scss';
import { Button } from 'src/ui/button/Button';
import { Input } from 'src/ui/input/Input';
import { useState } from 'react';
import { Plus } from 'lucide-react';

export const AddTaskForm = ({
  addTask,
}: {
  addTask: (title: string) => void;
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!value.trim()) return;
    addTask(value);
    setValue('');
  };

  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
      <Input
        placeholder='Введите задачу'
        label='Введите задачу'
        value={value}
        onChange={(e) => setValue(e.target.value)}></Input>
      <Button icon={<Plus size={30} color="black" />} type='apply' htmlType='submit'></Button>
    </form>
  );
};
