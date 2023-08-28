import React from 'react';
import styles from './List.module.scss';
import clsx from 'clsx';

// React.createElement(요소명, props - {className, style, href ...}, 자식요소 - children 또는 React.createElement(): map으로 반복처리 가능)

function List({ data, tag = 'ul', className, style }) {
	return React.createElement(
		tag,
		{
			className: clsx(styles.list, className),
			style: style,
		},
		data.map((el, idx) =>
			React.createElement(
				'li',
				{
					key: idx,
				},
				tag === 'ol' ? `${idx + 1} - ${el}` : el
			)
		)
	);
}

export default List;
