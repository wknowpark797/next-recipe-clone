import { Btn } from '@/components/atoms/button/Btn';
import styles from './Category.module.scss';
import clsx from 'clsx';

function Category({ items, onClick, active, names }) {
	return (
		<nav className={clsx(styles.category)}>
			{items.map((item, idx) => {
				return (
					<Btn
						key={idx}
						onClick={() => onClick(items[idx])}
						isActive={active === items[idx]}
					>
						{names ? names[idx] : item}
					</Btn>
				);
			})}
		</nav>
	);
}

export default Category;
