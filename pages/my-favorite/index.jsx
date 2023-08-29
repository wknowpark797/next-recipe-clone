import Head from 'next/head';
import clsx from 'clsx';
import Title from '@/components/atoms/text/Title';
import styles from './favorite.module.scss';
import { useState, useEffect } from 'react';
import { useRecipesByIds } from '@/hooks/useRecipe';

function Favorite() {
	const [SavedId, setSavedId] = useState([]);

	useEffect(() => {
		if (localStorage.getItem('savedRecipe')) {
			setSavedId(JSON.parse(localStorage.getItem('savedRecipe')));
		} else {
			JSON.stringify(localStorage.setItem('savedRecipe', []));
		}
	}, []);

	useEffect(() => {
		console.log(SavedId);
	}, [SavedId]);

	useRecipesByIds(SavedId);

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
