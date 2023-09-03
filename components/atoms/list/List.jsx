import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import styles from './List.module.scss';

/*
	React.createElement(요소명, props, 자식요소)

	props 
		- { className, style, href... }
	
	자식요소 
		- children
		- React.createElement() : map으로 반복처리 가능
*/

export function List({ data, tag = 'ul', className, style, url }) {
	return React.createElement(
		tag,
		{
			style: style,
			className: clsx(styles.list, className),
		},
		data.map((el, idx) => {
			const child = tag === 'ol' ? `${idx + 1} - ${el}` : el;

			return React.createElement(
				'li',
				{
					key: idx,
				},
				// url이 있을 경우 Link 컴포넌트 추가
				url
					? React.createElement(
							Link,
							{
								href: `${url[idx]}`,
							},
							child
					  )
					: child
			);
		})
	);
}
