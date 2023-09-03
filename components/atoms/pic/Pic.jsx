import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import { RingLoader } from 'react-spinners';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import styles from './Pic.module.scss';

export function Pic({
	style,
	className,
	imgSrc,
	priority = false,
	imgTxt,
	children,
	url,
}) {
	const [IsLoaded, setIsLoaded] = useState(false);
	const { point } = useThemeColor();

	return (
		<div style={style} className={clsx(styles.pic, className)}>
			<Image
				src={imgSrc}
				alt={imgSrc}
				priority={priority}
				onLoadingComplete={() => setIsLoaded(true)}
				fill
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/*
					[ sizes 속성 ]
					- 이미지 속성이 fill로 지정되어 있을 경우 frame크기에 상관없이 초기 로딩시 전체 브라우저 크기의 100vw 크기의 용량으로 가져온다.
					- sizes 속성을 사용하면 브라우저 폭에 따라 출력될 크기를 지정해서 이미지 성능을 향상할 수 있다.
				*/
			/>

			{imgTxt && (
				<>
					<aside></aside> {/* dim 처리 마스크 */}
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

			{/* react-spinners */}
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
