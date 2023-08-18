import React from 'react';
import Link from 'next/link';
import styles from './Title.module.scss';
import clsx from 'clsx';
import { Nanum_Myeongjo, Orbitron } from 'next/font/google';

const nanum = Nanum_Myeongjo({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-nanum', // 직접 사용할 변수명 등록, 해당 변수명을 사용하기 위해서는 클래스 등록 X
});

const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-orbitron',
});

/*
function Title({ children, url, style, className, type }) {
	return (
		<h1
			// 폰트 객체의 클래스명을 지정하면 안쪽의 모든 폰트는 해당 폰트가 디폴트로 적용
			// 변수명을 활용해서 선별적으로 쓰고 싶을 때 객체.variable (해당 특정요소에만 적용, 자식요소 상속X)
			className={clsx(
				styles.tit,
				className,
				nanum.variable,
				orbitron.variable,
				// 연관배열 형태로 스타일객체의 클래스 지정
				styles[`tit-${type}`]
			)}
			// url 속성 유무로 자식에게 링크가 있는지 파악 후
			// 링크가 있으면 상위요소인 h1 엘리먼트에 transition 속성 제거
			// 링크가 없으면 transition 속성 추가
			style={url ? style : { ...style, transitionDuration: '0.5s' }}
			// 해당 컴포넌트에 hover이벤트가 발생할 때마다 hover, color 값을 분기처리
			// style객체가 넘어오지 않을때를 대비하여 옵셔널 체이닝 적용
			onMouseEnter={(e) => (e.target.style.color = style?.hoverColor)}
			onMouseLeave={(e) => (e.target.style.color = style?.color)}
		>
			{url ? (
				// 링크가 있으면 transition이 적용되어야 하기 때문에 해당 속성 추가
				<Link href={url} style={{ transitionDuration: '0.5s' }}>
					{children}
				</Link>
			) : (
				children
			)}
		</h1>
	);
}
*/

// React.createElement(elementType: String, props: Object, children: React Node)
function Title({
	children,
	url,
	style,
	className,
	type,
	tag = 'h1',
}) {
	return React.createElement(
		tag, // elementType
		{
			// props
			className: clsx(
				styles.tit,
				className,
				nanum.variable,
				orbitron.variable,
				styles[`tit-${type}`]
			),
			style: url ? style : { ...style, transitionDuration: '0.5s' },
			onMouseEnter: (e) => (e.target.style.color = style?.hoverColor),
			onMouseLeave: (e) => (e.target.style.color = style?.color),
		},
		// React Node
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

export default Title;
