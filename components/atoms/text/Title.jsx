import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Nanum_Myeongjo, Orbitron } from 'next/font/google';
import styles from './Title.module.scss';

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

// React.createElement(elementType: String, props: Object, children: React Node)
export function Title({
	children,
	url,
	style,
	className,
	type,
	tag = 'h1',
}) {
	return React.createElement(
		tag,
		{
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
