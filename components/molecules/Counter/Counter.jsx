import { Text } from '@/components/atoms/text/Text';
import styles from './Counter.module.scss';
import clsx from 'clsx';

function Counter({ index, length }) {
	return (
		<div className={clsx(styles.counter)}>
			<Text tag={'strong'} type={'menu'}>
				{index < 10 ? '0' + (index + 1) : index + 1}
			</Text>
			<Text tag={'span'} type={'menu'}>
				/ {length < 10 ? '0' + length : length}
			</Text>
		</div>
	);
}

export default Counter;
