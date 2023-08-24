import Head from 'next/head';
import axios from 'axios';
import styles from './style.module.scss';
import clsx from 'clsx';
import Category from '@/components/molecules/Category/Category';
import {
	useRecipeByCategory,
	useRecipeBySearch,
} from '@/hooks/useRecipe';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Card from '@/components/molecules/Card/Card';
import Title from '@/components/atoms/text/Title';
import SearchBar from '@/components/molecules/SearchBar/SearchBar';

/*
	[ custom hook ]
	- 자주 활용되는 리액트 기능을 패키징해서 hook 형태로 만들어놓은 함수
	- 인수가 전달되면 해당값을 활용해서 react-query를 이용하여 비동기서버 데이터를 호출하고 해당 결과값을 객체 형태로 리턴하는 함수

	[ react-query 사용이유 ]
	- 반환받은 서버 데이터를 캐싱처리해서 동일한 데이터 요청시 다시 refetching하지 않기 위함

	{data(반환받은 서버 데이터), isSuccess(요청 성공시 true 반환), isError(요청 실패시 true 반환), isLoading(요청중일 때 true 반환), refetch(강제 refetching 함수)}
*/

export default function Recipe({ categories }) {
	// react-query를 활용하는 queryKey 인수값을 state에 담는다.
	const [Selected, setSelected] = useState(categories[0].strCategory);
	const [Search, setSearch] = useState('');

	// Selected state값이 바뀔때마다 react-query 훅이 호출되면서 새로운 데이터를 패칭
	// const { data, isSuccess } = useRecipeByCategory(Selected);

	// 카테고리 버튼 클릭 디바운싱 처리
	// useDebounde는 컴포넌트의 재렌더링 자체를 막는것이 아닌
	// 특정 state가 변경될때마다 실행되는 무거운 함수의 호출 자체를 Debouncing 처리하기 위함
	const DebouncedSelected = useDebounce(Selected);
	const DebouncedSearch = useDebounce(Search);

	const { data: dataByCategory, isSuccess: isCategory } =
		useRecipeByCategory(DebouncedSelected, DebouncedSearch);
	const { data: dataBySearch, isSuccess: isSearch } =
		useRecipeBySearch(DebouncedSearch);

	// 카테고리 버튼을 클릭할 때 실행
	// Selected값이 변경되고 새롭게 쿼리 요청을 보내는 조건이 Search값이 비어있어야 가능
	// Search값을 비운 후 state 변경요청을 보내는 함수
	const handleClickCategory = (state) => {
		setSearch('');
		setSelected(state);
	};

	// Debouncing되는 search, selected값이 변경될때마다 실행되는 useEffect
	useEffect(() => {
		if (DebouncedSearch) {
			// Search값이 있다면 기존의 카테고리 값을 비워야하기 때문에 setSelected 빈문자값을 쿼리로 보내 빈배열을 다시 반환, 결과적으로 해당 데이터는 화면에서 사라진다.
			setSelected('');
		} else {
			// Search값이 없다면 다시 Search를 초기화시킨다.
			setSearch('');
			// Selected값을 변경해서 새로 쿼리요청을 보낸다.
			!DebouncedSelected && setSelected(categories[0].strCategory);
		}
	}, [DebouncedSearch, DebouncedSelected, categories]);

	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				{/* 이벤트가 발생해야 하는 자식요소에 queryKey로 연동되어 있는 state 변경함수를 전달 */}
				{/* 자식 컴포넌트에 이벤트를 전달해야 할 때 이벤트명을 props로 핸들러 함수 전달 */}
				{/* 자식 컴포넌트에서 이벤트 발생시 어떤 핸들러인지 명시적으로 파악하기 위함 */}
				{/* State를 변경하는 이벤트 핸들러함수를 onClick props에 담아서 전달 */}
				<Category
					items={categories}
					onClick={handleClickCategory}
					active={DebouncedSelected}
				/>

				<Title type={'slogan'} className={clsx(styles.titCategory)}>
					{DebouncedSelected}
				</Title>

				<SearchBar
					inputType={'text'}
					isBtn={false}
					placeholder={'search'}
					value={Search}
					onChange={setSearch}
				/>

				<div className={clsx(styles.listFrame)}>
					{isCategory &&
						dataByCategory.map((el) => {
							return (
								<Card
									key={el.idMeal}
									imgSrc={el.strMealThumb}
									url={`/find-recipe/${el.idMeal}`}
									txt={`category+${el.strMeal}`}
									className={clsx(styles.card)}
								/>
							);
						})}

					{isSearch &&
						dataBySearch.map((el) => {
							return (
								<Card
									key={el.idMeal}
									imgSrc={el.strMealThumb}
									url={`/find-recipe/${el.idMeal}`}
									txt={`search+${el.strMeal}`}
									className={clsx(styles.card)}
								/>
							);
						})}
				</div>
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
