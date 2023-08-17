import Link from 'next/link';
import styles from './Title.module.scss';
import clsx from 'clsx';

function Title({ children, url, style, className }) {
	return (
		<h1
			className={clsx(styles.tit, className)}
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

export default Title;
