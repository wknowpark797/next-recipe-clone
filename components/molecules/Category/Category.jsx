import { Btn } from '@/components/atoms/button/Btn';
import clsx from 'clsx';
import styles from './Category.module.scss';

export function Category({
	items,
	onClick,
	active,
	names,
	className,
}) {
	return (
		<nav className={clsx(styles.category, className)}>
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
