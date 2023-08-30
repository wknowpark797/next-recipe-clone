import { Fragment } from 'react';
import Text from '@/components/atoms/text/Text';
import styles from './Breadcrumb.module.scss';
import clsx from 'clsx';

function Breadcrumb({ data }) {
	return (
		<nav className={clsx(styles.breadcrumb)}>
			{data.map((name, idx) => {
				return (
					<Fragment key={idx}>
						<Text tag={'em'}>{name}</Text>
						<span>/</span>
					</Fragment>
				);
			})}
		</nav>
	);
}

export default Breadcrumb;
