import Head from 'next/head';
import styles from './Home.module.scss';
import clsx from 'clsx';
import axios from 'axios';
import Image from 'next/image';

// https://www.themealdb.com 라이브러리 활용
export default function Home({ meals }) {
	// console.log('meals props: ', meals);
	const newMeals = meals.slice(0, 7);

	return (
		<>
			<Head>
				<title>Next Recipe</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={clsx(styles.main)}>
				<figure className='visual'>
					<article className='bg'>
						{newMeals.map((item) => {
							return (
								<div key={item.idMeal} className='pic' style={{ position: 'relative', width: 370, height: 270 }}>
									<Image
										src={item.strMealThumb}
										alt={item.strMeal}
										priority
										fill
										quality={50}
										style={{ objectFit: 'cover' }}
									/>
								</div>
							);
						})}
					</article>

					<article className='list'>
						{newMeals.map((item) => {
							return <h2 key={item.idMeal}>{item.strMeal}</h2>;
						})}
					</article>
				</figure>
			</main>
		</>
	);
}

// ISR 방식 작업 - 주기설정
// ISR 방식 화면 확인 - 빌드 후 npm run start
export async function getStaticProps() {
	const { data } = await axios.get(`/filter.php?c=Seafood`);
	// console.log('Data fetching on Server: ', data);

	// props로 데이터를 넘길 때 data 안쪽의 값까지 뽑아낸 후 전달
	return {
		props: data,
		revalidate: 60 * 60 * 24,
	};
}
