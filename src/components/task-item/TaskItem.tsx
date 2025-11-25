import { Text } from 'src/ui/text/Text';
import { Button } from 'src/ui/button/Button';
import { Trash, Check, CornerUpLeft } from 'lucide-react';
import styles from './TaskItem.module.scss';

type TaskItemProps = {
  text: string;
  completed: boolean;
  onDelete: () => void;
  onToggleComplete?: () => void;
};

export const TaskItem = ({
  text,
  completed,
  onDelete,
  onToggleComplete,
}: TaskItemProps) => {
  return (
    <article className={styles.container}>
      <Text
        weight={completed ? 400 : 800}
        decoration={completed ? 'line-through' : 'none'}>
        {text}
      </Text>
      <div className={styles.actions}>
        <Button
          icon={
            completed ? (
              <CornerUpLeft size={30} color='black' />
            ) : (
              <Check size={30} color='black' />
            )
          }
          type={completed ? 'secondary' : 'success'}
          onClick={() => onToggleComplete?.()}
        />
        <Button
          icon={<Trash size={30} color='black' />}
          type='clear'
          onClick={onDelete}
        />
      </div>
    </article>
  );
};
