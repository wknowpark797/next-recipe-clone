import { Pic } from '@/components/atoms/pic/Pic';
import Title from '@/components/atoms/text/Title';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import clsx from 'clsx';
import { RingLoader } from 'react-spinners';
import { useState, useEffect } from 'react';
import Table from '@/components/atoms/Table/Table';
import List from '@/components/atoms/list/List';
import Btn from '@/components/atoms/button/Btn';
import Text from '@/components/atoms/text/Text';

function Detail() {
	// 정규표현식에서 해당 조건이 포함이 아닌 정확하게 조건에 부합될때만 처리 ^조건$
	// 표현식 뒤의 +는 해당 조건의 값이 반복되는 경우에도 true로 평가
	// const result = /^\d+[.][' ']$/.test('2');

	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);

	const [TableData, setTableData] = useState([]);
	const [ListData, setListData] = useState([]);
	const [Saved, setSaved] = useState(false);

	// recipeId값 저장, 삭제 토글 함수
	const handleSave = () => {
		const savedRecipe = JSON.parse(
			localStorage.getItem('savedRecipe')
		);

		if (!Saved) {
			savedRecipe.push(data.idMeal);
			localStorage.setItem(
				'savedRecipe',
				JSON.stringify(savedRecipe)
			);
			setSaved(true);
		} else {
			savedRecipe.splice(savedRecipe.indexOf(data.idMeal), 1);
			localStorage.setItem(
				'savedRecipe',
				JSON.stringify(savedRecipe)
			);
			setSaved(false);
		}
	};

	// router로 들어오는 id값이 변경될때마다 실행되는 useEffect
	useEffect(() => {
		if (localStorage.getItem('savedRecipe')) {
			const savedRecipe = JSON.parse(
				localStorage.getItem('savedRecipe')
			);

			if (savedRecipe.includes(id)) {
				setSaved(true);
			} else {
				setSaved(false);
			}
		} else {
			localStorage.setItem('savedRecipe', JSON.stringify([]));
		}
	}, [id]);

	// 무한루프에 빠지지 않도록 해당 컴포넌트에서 data를 받았을 때 한번만 호출해서 state에 저장 처리
	useEffect(() => {
		if (data) {
			const keys = Object.keys(data);
			// 레시피 정보 객체에서 strIngredient 문자로 시작하는 키값만 필터
			const filterKeys1 = keys.filter((key) =>
				key.startsWith('strIngredient')
			);
			// value값이 빈문자이거나 null이면 제외
			const filterKeys2 = filterKeys1.filter(
				(key) => data[key] !== '' && data[key] !== null
			);
			// 필터링된 키값으로 재료순서, 재료명, 재료량을 객체로 변환 후 배열로 반환
			const ingredients = filterKeys2.map((key, idx) => ({
				index: idx + 1,
				ingredient: data[key],
				measure: data[`strMeasure${idx + 1}`],
			}));

			setTableData(ingredients);

			// 레시피 순서
			const instructions = data.strInstructions
				.split('\r\n')
				.map((text) =>
					text.includes('.\t')
						? text.replace('.\t', '+').split('+')[1]
						: text
				)
				// 원본 문자열에 줄바꿈 정규표현식이 여러번 들어가 있는 문장의 경우 빈문장을 배열로 반환하기 때문에 해당 배열값 제거
				.filter((text) => text !== '');

			// console.log(instructions);
			setListData(instructions);
		}
	}, [data]);

	return (
		<section className={clsx(styles.detail)}>
			{/* 
				[ Spinner Loading ]
				Next는 라우터명이 변경될때마다 unmount되는 페이지 컴포넌트의 CSR방식으로 가져온 데이터와 스타일 노드를 제거한다.
				page transition이 적용되어 있기 때문에 상세페이지에서 다른페이지로 넘어갈 때 데이터는 이미 사라졌음에도 불구하고
				데이터를 활용하는 컴포넌트가 계속 있으면 prop오류 발생
				-> 해결방법: CSR방식으로 가져오는 데이터를 컴포넌트 렌더링의 조건 설정
					- 데이터가 없으면 로딩바 출력
					- 데이터가 있으면 그 데이터를 활용하는 컴포넌트 출력
			*/}
			<RingLoader
				cssOverride={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
				size={100}
				color={'aquamarine'}
				loading={!isSuccess}
			/>

			{isSuccess && (
				<>
					<Title type={'slogan'}>{data.strMeal}</Title>

					<div className={clsx(styles.picFrame)}>
						<Pic imgSrc={data.strMealThumb} />
					</div>
				</>
			)}

			<Btn onClick={handleSave} className={clsx(Saved && styles.del)}>
				{Saved ? '즐겨찾기 제거하기' : '즐겨찾기 추가하기'}
			</Btn>
			{Saved && <Text>즐겨찾기에 이미 추가된 레시피입니다.</Text>}

			<Table data={TableData} title={data?.strMeal} />

			<List data={ListData} url={Array(15).fill('a')} tag={'ol'} />
		</section>
	);
}

export default Detail;
