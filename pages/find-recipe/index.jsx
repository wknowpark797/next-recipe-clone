import Head from 'next/head';
import axios from 'axios';
import styles from './style.module.scss';
import clsx from 'clsx';
import Category from '@/components/molecules/Category/Category';

export default function Recipe({ categories }) {
	console.log('categories: ', categories);

	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				<Category items={categories} />
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
