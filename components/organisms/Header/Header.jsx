import { Title } from '../../atoms/text/Title';
import { Navbar } from '../../molecules/NavBar/Navbar';
import clsx from 'clsx';
import styles from './Header.module.scss';

function Header() {
	return (
		<header className={clsx(styles.header)}>
			<Title url={'/'} type={'logo'}>
				LOGO
			</Title>

			<Navbar names={['Find Recipe', 'My Favorite']} />
		</header>
	);
}

export default Header;
