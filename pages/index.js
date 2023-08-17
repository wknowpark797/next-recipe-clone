import Head from 'next/head';
import styles from './Home.module.scss';
import clsx from 'clsx';
import axios from 'axios';
import Title from '@/components/atoms/text/Title';

// https://www.themealdb.com 라이브러리 활용
export default function Home({ meals }) {
	console.log('meals: ', meals);

	return (
		<>
			<Head>
				<title>Next Recipe</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={clsx(styles.main)}>
				<Title
					url={'/abc'}
					className={styles.txt}
					style={{ color: 'violet', hoverColor: 'aquamarine' }}
					// style에 color값 적용시 hover값까지 같이 스크립트로 덮어쓰기 되기 때문에
					// hover색상과 함께 그룹으로 전달
					// style 객체로 전달하지 않으면 module.scss의 기본 hover 스타일 적용
				>
					Hello
				</Title>
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
