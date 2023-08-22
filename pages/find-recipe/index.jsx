import Head from 'next/head';
import axios from 'axios';
import styles from './style.module.scss';
import clsx from 'clsx';
import Btn from '@/components/atoms/button/Btn';

export default function Recipe({ categories }) {
	console.log('categories: ', categories);

	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				<nav>
					{categories.map((el) => {
						return <Btn key={el.idCategory}>{el.strCategory}</Btn>;
					})}
				</nav>
			</section>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get('/categories.php');

	return {
		props: { categories: data.categories },
	};
}
