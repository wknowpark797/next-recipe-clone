import { Pic } from '@/components/atoms/pic/Pic';
import Title from '@/components/atoms/text/Title';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import clsx from 'clsx';
import { RingLoader } from 'react-spinners';

function Detail() {
	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);

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
		</section>
	);
}

export default Detail;
