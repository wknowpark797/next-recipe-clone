import Head from 'next/head';
import clsx from 'clsx';
import { Title } from '@/components/atoms/text/Title';
import { useState, useEffect } from 'react';
import { useRecipesByIds } from '@/hooks/useRecipe';
import { Card } from '@/components/molecules/Card/Card';
import { useThemeColor } from '@/hooks/useThemeColor';
import styles from './favorite.module.scss';

function Favorite() {
	const { point } = useThemeColor();
	const [SavedId, setSavedId] = useState([]);

	useEffect(() => {
		if (localStorage.getItem('savedRecipe')) {
			setSavedId(JSON.parse(localStorage.getItem('savedRecipe')));
		} else {
			localStorage.setItem('savedRecipe', JSON.stringify([]));
		}
	}, []);

	// 복수개의 쿼리 요청 결과값을 반환하는 커스텀 훅 호출
	const result = useRecipesByIds(SavedId);

	return (
		<>
			<Head>
				<title>Favorite Page</title>
			</Head>

			<section className={clsx(styles.favoritePage)}>
				<Title type={'slogan'} style={{ color: point, hoverColor: point }} className={clsx(styles.titCategory)}>
					My Favorite Recipe
				</Title>

				{result &&
					result.map(({ data, isSuccess }) => {
						if (isSuccess) {
							return (
								<Card
									key={data.idMeal}
									imgSrc={data.strMealThumb}
									url={`/find-recipe/${data.idMeal}?name=${data.strMeal}`}
									txt={`${data.strMeal}`}
									className={clsx(styles.card)}
									type={'horizontal'}
								/>
							);
						}
					})}
			</section>
		</>
	);
}

export default Favorite;
