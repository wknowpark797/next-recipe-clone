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

function Detail() {
	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);

	const [TableData, setTableData] = useState([]);
	const [ListData, setListData] = useState([]);

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
				.split('.')
				.map((text) => text.replace('\r\n', '').trim() + '.')
				.filter((text) => text !== '.');

			setListData(instructions);
		}
	}, [data]);

	return (
		<section className={clsx(styles.detail)}>
			{/* Spinner Loading */}
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

			<Table data={TableData} title={data?.strMeal} />

			<List data={ListData} url={Array(15).fill('a')} tag={'ol'} />
		</section>
	);
}

export default Detail;
