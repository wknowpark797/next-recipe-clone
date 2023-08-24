import styles from './Input.module.scss';
import clsx from 'clsx';

function Input({
	type = 'text',
	placeholder = 'text',
	onChange,
	value,
	style,
	className,
}) {
	return (
		<input
			type={type}
			placeholder={placeholder}
			className={clsx(styles.input, className)}
			value={value}
			onChange={onChange}
			style={style}
		/>
	);
}

export default Input;
