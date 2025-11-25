import { Text } from 'src/ui/text/Text';
import styles from './Button.module.scss';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps {
  title?: string;
  icon?: ReactNode;
  onClick?: () => void;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  type: 'apply' | 'clear' | 'success' | 'secondary';
  active?: boolean;
}

export const Button = ({
  title,
  icon,
  onClick,
  htmlType = 'button',
  type,
  active = false,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[`button-${type}`],
        { [styles.active]: active }
      )}
      type={htmlType}
      onClick={onClick}>
        {title && <Text weight={800}> {title}</Text>}
        {icon }
    </button>
  );
};
