import Router from 'next/router';

export const keepStyle = (delay) => {
	Router.events.on('beforeHistoryChange', () => {
		// 기존의 스타일 노드를 모두 가져와서 복사 (자식 노드까지 포함)
		const nodes = document.querySelectorAll(
			'link[rel=stylesheet], style:not([media=x])'
		);
		const copies = [...nodes].map((el) => el.cloneNode(true));

		// next가 복사한 스타일 노드를 제거하지 못하도록 전용 속성명을 제거
		for (let copy of copies) {
			// 스크립트의 제어 없이 static하게 연결되는 스타일 (next가 제거하지 않는다.)
			copy.removeAttribute('data-n-g');
			// dynamic하게 연결되는 스타일 (스크립트 제어 - 컴포넌트 unmount될때 next가 제거한다.)
			copy.removeAttribute('data-n-href');
			document.head.appendChild(copy);
		}

		// 일정시간 후에 복사된 스타일 노드를 제거하는 함수
		const handler = () => {
			// 해당 함수가 실행되면 다시 이벤트 핸들러 제거
			Router.events.off('routeChangeComplete', handler);

			window.setTimeout(() => {
				for (let el of copies) {
					document.head.removeChild(el);
				}
			}, delay);
		};

		// 해당 함수를 라우터 변경이 끝나고 delay시간 이후에 실행된다.
		Router.events.on('routeChangeComplete', handler);
	});
};
