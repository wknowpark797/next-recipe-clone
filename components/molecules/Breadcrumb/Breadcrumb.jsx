import { Fragment } from 'react';
import { Text } from '@/components/atoms/text/Text';
import styles from './Breadcrumb.module.scss';
import clsx from 'clsx';

function Breadcrumb({ data, isActive }) {
	return (
		// isActive값이 true일 때 on 클래스 추가
		<nav
			className={clsx(styles.breadcrumb, isActive ? styles.on : '')}
		>
			{data.map((name, idx) => {
				// 라우터명 문자값에 '-'있을 때 처리
				const result = name.includes('-')
					? name
							.split('-')
							.map(
								(txt) => txt.charAt(0).toUpperCase() + txt.slice(1)
							)
							.join(' ')
					: name;

				// 문자값에 쿼리스트링이 있을 때 처리
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

export default Breadcrumb;
