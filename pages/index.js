import Head from 'next/head';
import axios from 'axios';
import { SwiperWrap } from '@/components/organisms/Swiper/Swiper';

// https://www.themealdb.com 라이브러리의 데이터 활용
export default function Home({ meals, category }) {
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main>
				<SwiperWrap recipe={meals.slice(0, 7)} category={category} />
			</main>
		</>
	);
}

// ISR 방식 작업 - 주기설정 (revalidate)
// ISR 방식 화면 확인 - 빌드 후 npm run start
export async function getStaticProps() {
	const list = [];
	const { data: obj } = await axios.get('/categories.php');
	const items = obj.categories;
	items.forEach((el) => list.push(el.strCategory));

	const newList = list.filter((el) => el !== 'Goat' && el !== 'Vegan' && el !== 'Starter');
	const randomNum = Math.floor(Math.random() * newList.length);

	const { data } = await axios.get(`/filter.php?c=${newList[randomNum]}`);

	// props로 데이터를 넘길 때 data 안쪽의 값까지 뽑아낸 후 전달
	return {
		props: { ...data, category: newList[randomNum] },
		revalidate: 60 * 60 * 24,
	};
}
