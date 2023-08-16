import Image from 'next/image';
import clsx from 'clsx';
import styles from './Visual.module.scss';

export function Visual({ imgSrc, style }) {
	return (
		<div className={clsx(styles.pic)} style={style}>
			<Image
				src={imgSrc}
				alt={imgSrc}
				priority
				fill
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/*
          [ sizes ]
					- 이미지 속성이 fill로 지정되어 있을 경우 frame크기에 상관없이 초기 로딩시 전체 브라우저 크기의 100vw 크기의 용량으로 가져온다.
					- sizes 속성을 사용하면 브라우저 폭에 따라 출력될 크기를 지정해서 이미지 성능을 향상할 수 있다.
        */
			/>
		</div>
	);
}

export function VisualWithText({ imgSrc, imgTxt, style }) {
	return (
		<div className={clsx(styles.picWithTxt)} style={style}>
			<Image
				src={imgSrc}
				alt={imgSrc}
				priority
				fill
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
			/>
			<h2>{imgTxt}</h2>
		</div>
	);
}
