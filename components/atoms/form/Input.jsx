import clsx from 'clsx';
import styles from './Input.module.scss';

export function Input({
	type = 'text',
	placeholder = 'text',
	style,
	className,
	value,
	onChange,
}) {
	return (
		<input
			type={type}
			placeholder={placeholder}
			style={style}
			className={clsx(styles.input, className)}
			value={value}
			onChange={(e) => onChange(e.target.value)}
		/>
	);
}
