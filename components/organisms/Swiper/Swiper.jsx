import styles from './Swiper.module.scss';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import Title from '@/components/atoms/text/Title';
import { useState } from 'react';
import Slider from '@/components/molecules/Slider/Slider';
import Counter from '@/components/molecules/Counter/Counter';

// Next에서 Autoplay, Pagination, Navigation 기능을 활성화하기 위해 SwiperCore.use 사용
SwiperCore.use([Autoplay]);

// npm install swiper@9
function SwiperWrap({ recipe, category }) {
	console.log('recipe: ', recipe);
	console.log('category: ', category);

	const [Index, setIndex] = useState(0);
	console.log('index: ', Index);

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

			<Slider data={recipe} index={Index} />
			<Counter index={Index} length={recipe.length} />

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
				// loop 기능 적용시 슬라이드가 동적으로 추가되기 때문에 순번의 어그러짐 발생
				// slideChange 이벤트 발생시 자동으로 전달되는 파라미터 객체의 realIndex 프로퍼티 활용
				onSlideChange={(el) => setIndex(el.realIndex)}
			>
				{recipe.map((item) => {
					return (
						<SwiperSlide
							key={item.idMeal}
							className={clsx(styles.swiperSlide)}
						>
							{/* SwiperSlide 컴포넌트 안쪽에서 자동으로 JSX를 리턴하는 함수 호출 가능 */}
							{/* 해당 함수에는 파라미터로 현재 컴포넌트 요소가 활성화되어 있는 구분할 수 있는 객체가 전달 */}
							{({ isActive }) => {
								return (
									<div className={clsx(isActive ? styles.on : '')}>
										<Title tag={'h3'} url={'/'} type={'slogan'}>
											{item.strMeal.length > 25
												? item.strMeal.substr(0, 25)
												: item.strMeal}
										</Title>
									</div>
								);
							}}
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}

export default SwiperWrap;
