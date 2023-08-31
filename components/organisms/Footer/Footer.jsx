import Title from '@/components/atoms/text/Title';
import styles from './Footer.module.scss';
import clsx from 'clsx';
import Text from '@/components/atoms/text/Text';
import { BounceLoader } from 'react-spinners';
import Btn from '@/components/atoms/button/Btn';
import { useGlobalData } from '@/hooks/useGlobalContext';

function Footer() {
	const { setTheme } = useGlobalData();

	return (
		<footer className={clsx(styles.footer)}>
			{/* 테마 컬러 변경 */}
			<nav>
				{['Orange', 'Hotpink', 'Aquamarine'].map((el, idx) => (
					<Btn key={idx} onClick={() => setTheme(`theme${idx + 1}`)}>
						{el}
					</Btn>
				))}
			</nav>

			<Title style={{ fontSize: 16, color: '#777' }}>LOGO</Title>
			<Text type={'util'} style={{ letterSpacing: 2 }}>
				2023 Decodelab All rights reserved.
			</Text>
		</footer>
	);
}

export default Footer;
