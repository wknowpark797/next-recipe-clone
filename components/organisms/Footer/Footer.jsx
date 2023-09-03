import { Text } from '@/components/atoms/text/Text';
import { useGlobalData } from '@/hooks/useGlobalContext';
import { Category } from '@/components/molecules/Category/Category';
import clsx from 'clsx';
import styles from './Footer.module.scss';

function Footer() {
	const { Theme, setTheme } = useGlobalData();

	return (
		<footer className={clsx(styles.footer)}>
			{/* 테마 컬러 변경 */}
			<nav>
				<Category
					items={['theme1', 'theme2', 'theme3']}
					names={['Orange', 'Hotpink', 'Aquamarine']}
					active={Theme}
					onClick={setTheme}
					className={clsx(styles.category)}
				/>
			</nav>

			<Text type={'util'} style={{ letterSpacing: 2 }}>
				2023 Decodelab All rights reserved.
			</Text>
		</footer>
	);
}

export default Footer;
