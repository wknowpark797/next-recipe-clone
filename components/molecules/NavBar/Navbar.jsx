import clsx from 'clsx';
import styles from './Navbar.module.scss';
import { Text } from '../../atoms/text/Text';
import { useRouter } from 'next/router';

function Navbar({ names, gap }) {
	const path = useRouter().asPath.substring(1);

	return (
		<nav className={clsx(styles.gnb)} style={{ gap: gap }}>
			{names.map((el) => {
				// props로 들어온 문자값을 먼저 소문자로 변경 후 빈칸이 있으면 빈칸을 구분점으로 하여 배열로 변환한 후 다시 배열을 하이픈으로 연결하여 문자열로 반환하여 라우터 경로로 설정
				const url = el.toLowerCase().split(' ').join('-');

				if (path === url) {
					return (
						<Text key={url} type={'menu'} tag={'span'} isOn={true}>
							{el}
						</Text>
					);
				} else {
					return (
						<Text
							key={url}
							url={`/${url}`}
							type={'menu'}
							tag={'span'}
						>
							{el}
						</Text>
					);
				}
			})}
		</nav>
	);
}

export default Navbar;
