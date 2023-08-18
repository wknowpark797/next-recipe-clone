import Title from '../../atoms/text/Title';
import Navbar from '../../molecules/NavBar/Navbar';
import styles from './Header.module.scss';
import clsx from 'clsx';

function Header() {
	return (
		<header className={clsx(styles.header)}>
			<Title url={'/'} type={'logo'}>
				LOGO
			</Title>

			<Navbar names={['Find Recipe', 'My Favorite']} gap={20} />
		</header>
	);
}

export default Header;
