import Title from '@/components/atoms/text/Title';
import styles from './Footer.module.scss';
import clsx from 'clsx';
import Text from '@/components/atoms/text/Text';
import { BounceLoader } from 'react-spinners';
import Btn from '@/components/atoms/button/Btn';

function Footer() {
	return (
		<footer className={clsx(styles.footer)}>
			{/* 테마 컬러 변경 */}
			<nav>
				<Btn>Orange</Btn>
				<Btn>Hotpink</Btn>
				<Btn>Aquamarine</Btn>
			</nav>

			<Title style={{ fontSize: 16, color: '#777' }}>LOGO</Title>
			<Text type={'util'} style={{ letterSpacing: 2 }}>
				2023 Decodelab All rights reserved.
			</Text>
		</footer>
	);
}

export default Footer;
