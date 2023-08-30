import { Fragment } from 'react';
import Text from '@/components/atoms/text/Text';
import styles from './Breadcrumb.module.scss';
import clsx from 'clsx';

function Breadcrumb({ data }) {
	return (
		<nav className={clsx(styles.breadcrumb)}>
			{data.map((name, idx) => {
				const result = name.includes('-')
					? name
							.split('-')
							.map(
								(txt) => txt.charAt(0).toUpperCase() + txt.slice(1)
							)
							.join(' ')
					: name;

				if (idx !== data.length - 1) {
					// 반복되는 메뉴 순번이 마지막이 아닐 때
					return (
						<Fragment key={idx}>
							<Text tag={'em'} url={`/${name}`}>
								{name ? result : 'Home'}
							</Text>
							<span> / </span>
						</Fragment>
					);
				} else {
					// 마지막 순번
					return (
						<Text key={idx} tag={'strong'}>
							{result.includes('?')
								? result.split('=')[1].replaceAll('%20', ' ')
								: result}
						</Text>
					);
				}
			})}
		</nav>
	);
}

export default Breadcrumb;
