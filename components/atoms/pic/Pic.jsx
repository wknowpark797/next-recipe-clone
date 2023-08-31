import Image from 'next/image';
import clsx from 'clsx';
import styles from './Pic.module.scss';
import Link from 'next/link';
import { RingLoader } from 'react-spinners';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

// react-spinners 활용
export function Pic({
	imgSrc,
	imgTxt,
	style,
	children,
	// 해당 Atom 컴포넌트가 호출되는 위치에서의 className props를 내부로 전달
	className,
	priority = false,
	url,
}) {
	const [IsLoaded, setIsLoaded] = useState(false);
	const { point } = useThemeColor();

	return (
		<div className={clsx(styles.pic, className)} style={style}>
			<Image
				src={imgSrc}
				alt={imgSrc}
				priority={priority}
				fill
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/*
          [ sizes ]
					- 이미지 속성이 fill로 지정되어 있을 경우 frame크기에 상관없이 초기 로딩시 전체 브라우저 크기의 100vw 크기의 용량으로 가져온다.
					- sizes 속성을 사용하면 브라우저 폭에 따라 출력될 크기를 지정해서 이미지 성능을 향상할 수 있다.
        */
				onLoadingComplete={() => setIsLoaded(true)}
			/>

			{/* 컴포넌트 호출시 전달되는 props의 유무에 따라서 반환하는 JSX 분기처리 */}
			{imgTxt && (
				<>
					{/* dim 처리 마스크 */}
					<aside></aside>

					{/* url 값이 전달되면 Link 컴포넌트를 연결해서 출력 */}
					{url ? (
						<h2>
							<Link href={url}>{imgTxt}</Link>
						</h2>
					) : (
						<h2>{imgTxt}</h2>
					)}
				</>
			)}

			{children && (
				<>
					<aside></aside>
					{url ? <Link href={url}>children</Link> : children}
				</>
			)}

			{/* Spinner Loading */}
			<RingLoader
				cssOverride={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
				size={100}
				color={point}
				loading={!IsLoaded}
			/>
		</div>
	);
}
