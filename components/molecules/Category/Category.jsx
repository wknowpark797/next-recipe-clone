import Btn from '@/components/atoms/button/Btn';
import styles from './Category.module.scss';
import clsx from 'clsx';

function Category({ items }) {
	return (
		<nav className={clsx(styles.category)}>
			{items.map((item) => {
				return <Btn key={item.idCategory}>{item.strCategory}</Btn>;
			})}
		</nav>
	);
}

export default Category;
