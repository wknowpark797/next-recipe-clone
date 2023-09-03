import clsx from 'clsx';
import { Text } from '../../atoms/text/Text';
import { useRouter } from 'next/router';
import styles from './Navbar.module.scss';

export function Navbar({ names }) {
	const path = useRouter().asPath.substring(1);

	return (
		<nav className={clsx(styles.gnb)}>
			{names.map((el) => {
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
