import { Input } from '@/components/atoms/form/Input';
import clsx from 'clsx';
import { Btn } from '@/components/atoms/button/Btn';
import { FiSearch } from 'react-icons/fi';
import styles from './SearchBar.module.scss';

export function SearchBar({
	isBtn = true,
	btnText = 'button',
	inputType,
	value,
	onChange,
	placeholder,
}) {
	return (
		<div className={clsx(styles.searchBar)}>
			<Input
				type={inputType}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
			<FiSearch />
			{isBtn && <Btn>{btnText}</Btn>}
		</div>
	);
}
