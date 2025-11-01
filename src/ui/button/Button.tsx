import { Text } from 'src/ui/text/Text';

import styles from './Button.module.scss';
import { clsx } from 'clsx';

export const Button = ({
	title,
	onClick,
	htmlType,
	type,
}: {
	title: string;
	onClick?: () => void;
	htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	type: 'apply' | 'clear' | 'success' | 'secondary';
}) => {
	return (
		<button
			className={clsx(
				styles.button,
				{ [styles['button-apply']]: type === 'apply' },
				{ [styles['button-clear']]: type === 'clear' },
                { [styles['button-success']]: type === 'success' },
                { [styles['button-secondary']]: type === 'secondary' }

			)}
			type={htmlType = 'button'}
			onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
