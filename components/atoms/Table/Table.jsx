import { Title } from '../text/Title';
import clsx from 'clsx';
import styles from './Table.module.scss';

export function Table({ data, title }) {
	if (data.length === 0) return;

	return (
		<>
			{title && <Title>{title}</Title>}

			<table className={clsx(styles.table)}>
				<thead>
					<tr>
						{/* 첫번째 배열의 키값만 반복하여 제목 출력 */}
						{Object.keys(data[0]).map((key) => (
							<th key={key}>{key}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((el, idx) => (
						<tr key={idx}>
							{Object.values(el).map((val, idx) => (
								<td key={idx}>{val}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
