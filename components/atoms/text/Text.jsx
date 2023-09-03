import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Nanum_Myeongjo, Orbitron } from 'next/font/google';
import { useRouter } from 'next/router';
import styles from './Text.module.scss';

/*
	[ adjustFontFallback 사용 ]
	- 빌드시 오류 발생
	- display 'block'(기본값): 외부 폰트가 준비되지 않았을 때 해당 텍스트를 숨김처리
	- display 'swap': 외부 폰트가 준비되지 않았을 때 기본 system 폰트를 fallback(대체 폰트 출력) 처리해서 보임처리
	- adjustFontFallback: 레이아웃의 최적화를 위해 자동으로 fallback(대체 폰트 출력)기능 실행
*/

const nanum = Nanum_Myeongjo({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-nanum',
	display: 'block',
	adjustFontFallback: true,
});
const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-orbitron',
	display: 'block',
	adjustFontFallback: true,
});

export function Text({
	style,
	className,
	type,
	isOn = false,
	tag = 'p',
	url,
	children,
}) {
	const router = useRouter();
	const currentPath = router.pathname;

	return React.createElement(
		tag,
		{
			className: clsx(
				currentPath === url ? styles.on : '',
				nanum.variable,
				orbitron.variable,
				isOn && styles.on,
				styles.txt,
				className,
				styles[`txt-${type}`]
				/*
					- 전달되는 type props의 boolean값에 따라 고유클래스 on 추가
					- module.scss가 자체적으로 고유클래스명으로 변환하기 때문에 부모의 클래스명을 내부 전용 css에 연결하는것이 불가능하기 때문
				*/
			),
			style: url ? style : { ...style, transitionDuration: '0.5s' },
			onMouseEnter: (e) => (e.target.style.color = style?.hoverColor),
			onMouseLeave: (e) => (e.target.style.color = style?.color),
		},

		url
			? React.createElement(
					Link,
					{
						href: url,
						style: { transitionDuration: '0.5s' },
					},
					children
			  )
			: children
	);
}
