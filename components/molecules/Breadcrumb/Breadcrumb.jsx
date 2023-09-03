import { Fragment } from 'react';
import { Text } from '@/components/atoms/text/Text';
import clsx from 'clsx';
import styles from './Breadcrumb.module.scss';

export function Breadcrumb({ data, isActive }) {
	return (
		<nav
			className={clsx(styles.breadcrumb, isActive ? styles.on : '')}
		>
			{data.map((name, idx) => {
				// 라우터명 문자값에 '-'이 있을 경우
				const result = name.includes('-')
					? name
							.split('-')
							.map(
								(txt) => txt.charAt(0).toUpperCase() + txt.slice(1)
							)
							.join(' ')
					: name;

				// 라우터명 문자값에 쿼리스트링이 있을 경우
				const result2 = result.includes('?')
					? result.split('=')[1].replaceAll('%20', ' ')
					: result;

				if (idx !== data.length - 1) {
					// 반복되는 메뉴 순번이 마지막이 아닐 때
					return (
						<Fragment key={idx}>
							<Text tag={'em'} url={`/${name}`}>
								{result ? result : 'Home'}
							</Text>
							<span> / </span>
						</Fragment>
					);
				} else {
					// 마지막 순번
					return (
						<Text key={idx} tag={'strong'}>
							{result2}
						</Text>
					);
				}
			})}
		</nav>
	);
}
