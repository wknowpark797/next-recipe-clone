import styles from './Swiper.module.scss';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import Title from '@/components/atoms/text/Title';

// Next에서 Autoplay, Pagination, Navigation 기능을 활성화하기 위해 SwiperCore.use 사용
SwiperCore.use([Autoplay]);

// npm install swiper@9
function SwiperWrap({ recipe, category }) {
	console.log('recipe: ', recipe);
	console.log('category: ', category);

	return (
		<figure className={clsx(styles.visual)}>
			<Title
				style={{
					position: 'absolute',
					top: '20vh',
					left: '10vw',
					fontSize: 50,
					color: 'orange',
				}}
			>
				{category}
			</Title>

			<Swiper
				className={clsx(styles.swiper)}
				modules={[Autoplay]}
				autoplay={{ delay: 2000, disableOnInteraction: true }}
				loop={true}
				grabCursor={true}
				slidesPerView={1}
				spaceBetween={100}
				centeredSlides={true}
				breakpoints={{
					1200: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
			>
				{recipe.map((item) => {
					return (
						<SwiperSlide
							key={item.idMeal}
							className={clsx(styles.swiperSlide)}
						>
							<div>
								<Title tag={'h3'} url={'/'} type={'slogan'}>
									{item.strMeal.length > 25
										? item.strMeal.substr(0, 25)
										: item.strMeal}
								</Title>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}

export default SwiperWrap;
