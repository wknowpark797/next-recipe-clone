import clsx from 'clsx';
import styles from './Btn.module.scss';

export function Btn({
	type = 'button',
	style,
	className,
	isActive,
	onClick,
	children,
}) {
	return (
		<button
			type={type}
			style={style}
			className={clsx(
				styles.btn,
				className,
				isActive ? styles.on : ''
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
