import Btn from '@/components/atoms/button/Btn';
import styles from './Category.module.scss';
import clsx from 'clsx';

function Category({ items, onClick, active }) {
	return (
		<nav className={clsx(styles.category)}>
			{items.map((item) => {
				return (
					<Btn
						key={item.idCategory}
						onClick={() => onClick(item.strCategory)}
						isActive={item.strCategory === active}
					>
						{item.strCategory}
					</Btn>
				);
			})}
		</nav>
	);
}

export default Category;
