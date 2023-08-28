import React from 'react';
import styles from './List.module.scss';
import clsx from 'clsx';
import Link from 'next/link';

// React.createElement(요소명, props - {className, style, href ...}, 자식요소 - children 또는 React.createElement(): map으로 반복처리 가능)

function List({ data, tag = 'ul', className, style, url }) {
	return React.createElement(
		// 부모요소 element (ul, ol)
		tag,
		{
			className: clsx(styles.list, className),
			style: style,
		},
		// 자식요소 element 반복 (li)
		data.map((el, idx) => {
			const child = tag === 'ol' ? `${idx + 1} - ${el}` : el;

			return React.createElement(
				'li', // 요소명
				{
					key: idx, // props
				},
				// li의 자식요소 (url이 있을 경우 Link 컴포넌트 추가)
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

export default List;
