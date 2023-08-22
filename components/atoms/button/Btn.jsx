import styles from './Btn.module.scss';
import clsx from 'clsx';

function Btn({
	type = 'button',
	children,
	style,
	className,
	onClick,
}) {
	return (
		<button
			type={type}
			style={style}
			className={clsx(styles.btn, className)}
			// 부모로부터 handler라는 공통의 props 이름으로 이벤트핸들러 함수 호출
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Btn;
