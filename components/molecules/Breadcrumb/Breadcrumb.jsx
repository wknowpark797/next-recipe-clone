import { Fragment } from 'react';
import Text from '@/components/atoms/text/Text';
import styles from './Breadcrumb.module.scss';
import clsx from 'clsx';

function Breadcrumb({ data }) {
	return (
		<nav className={clsx(styles.breadcrumb)}>
			{data.map((name, idx) => {
				if (idx !== data.length - 1) {
					// 반복되는 메뉴 순번이 마지막이 아닐 때
					return (
						<Fragment key={idx}>
							<Text tag={'em'} url={`/${name}`}>
								{name ? name : 'home'}
							</Text>
							<span> / </span>
						</Fragment>
					);
				} else {
					// 마지막 순번
					return (
						<Text key={idx} tag={'strong'}>
							{name.includes('?')
								? name.split('=')[1].replaceAll('%20', ' ')
								: name}
						</Text>
					);
				}
			})}
		</nav>
	);
}

export default Breadcrumb;
