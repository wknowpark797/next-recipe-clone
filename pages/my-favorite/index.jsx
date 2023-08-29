import Head from 'next/head';
import clsx from 'clsx';
import Title from '@/components/atoms/text/Title';
import styles from './favorite.module.scss';

function Favorite() {
	return (
		<>
			<Head>
				<title>Favorite Page</title>
			</Head>

			<section className={clsx(styles.favoritePage)}>
				<Title type={'slogan'}>My Favorite Recipe</Title>
			</section>
		</>
	);
}

export default Favorite;
