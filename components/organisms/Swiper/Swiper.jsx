import clsx from 'clsx';
import { Title } from '@/components/atoms/text/Title';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import { useState } from 'react';
import { Slider } from '@/components/molecules/Slider/Slider';
import { Counter } from '@/components/molecules/Counter/Counter';
import { Text } from '@/components/atoms/text/Text';
import styles from './Swiper.module.scss';

// Next에서 Autoplay, Pagination, Navigation 기능 활성화
SwiperCore.use([Autoplay]);

// npm install swiper@9
export function SwiperWrap({ recipe, category }) {
	const [Index, setIndex] = useState(0);

	return (
		<figure className={clsx(styles.visual)}>
			<Title>{category}</Title>

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
				onSlideChange={(el) => setIndex(el.realIndex)}
				/*
					loop 기능 적용시 슬라이드가 동적으로 추가되기 때문에 순번의 어그러짐 발생
						-> slideChange 이벤트 발생시 자동으로 전달되는 파라미터 객체의 realIndex 프로퍼티 활용
				*/
			>
				{recipe.map((item) => {
					return (
						<SwiperSlide
							key={item.idMeal}
							className={clsx(styles.swiperSlide)}
						>
							{/* SwiperSlide 컴포넌트 안쪽에서 자동으로 JSX를 리턴하는 함수 호출 가능 */}
							{/* 해당 함수에는 파라미터로 현재 컴포넌트 요소가 활성화되어 있는 구분할 수 있는 객체가 전달 */}
							{({ isActive, isPrev, isNext }) => {
								// callback함수 제공 프로퍼티 - isActive, isPrev, isNext, isVisible

								return (
									<div
										className={clsx(
											isActive && styles.on,
											isPrev && styles.prev,
											isNext && styles.next
										)}
									>
										<Title
											tag={'h3'}
											type={'slogan'}
											style={{ color: '#fff' }}
										>
											{item.strMeal.length > 25
												? item.strMeal.substr(0, 25)
												: item.strMeal}
										</Title>

										<Text
											type={'menu'}
											url={`/find-recipe/${item.idMeal}?name=${item.strMeal}`}
											className={clsx(styles.activeBtn)}
										>
											View Recipe
										</Text>
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
