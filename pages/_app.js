import Layout from '@/components/template/Layout';
import '@/styles/globals.scss';
import axios from 'axios';

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1';

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

/*
	[ 프로젝트 구성 ]
	요리명을 검색어로 입력하면 해당 요리의 정보와 레시피를 확인하는 웹서비스 개발
	- 좋아하는 레시피를 저장해서 즐겨찾기 (localStorage 저장)

	1. 메인페이지 (ISR)
		- 특정 카테고리의 요리들을 소개하는 intro 페이지

	2. 레시피 검색 페이지 (CSR)
		- 검색창으로 검색어를 입력하면 debounce를 적용해서 실시간으로 레시피의 목록 결과를 확인하는 페이지
		
		2-1. 레시피 상세페이지 (CSR)
			- 검색화면에서 목록 클릭시 출력되는 상세 페이지
			- 즐겨찾기 기능 추가

	3. 즐겨찾기 페이지 (CSR)
		- 즐겨찾기에 등록된 목록을 한번에 확인하는 페이지
*/

/*
	[ 페이지별 렌더링 방식 소개 ]
	CSR: 빈 HTML을 가져온 후 동적으로 리액트 컴포넌트가 hydration(정적인 파일에 동적인 기능 입히기)되면 클라이언트단에서 동적으로 데이터를 생성해서 렌더링하는 방식
		- React Query 활용방식: stale time, cache time을 지정해서 stale, cache 타임이 소진되기 전까지는 리패칭 금지

	SSR: 서버쪽에서 미리 데이터를 패칭 후 페이지를 미리 만들어서 렌더링하는 방식 (매번 컴포넌트 접속할 때마다 프리렌더링)
		- 데이터가 수시로 변경될 때

	SSG: 서버쪽에서 데이터를 패칭 후 페이지를 미리 만들어서 렌더링하는것은 동일하지만 해당 프로젝트가 빌드될 때 한번 프리렌더링

	ISR: 서버쪽에서 데이터를 패칭 후 페이지를 미리 만들어서 렌더링하는것은 동일하지만 일정시간을 직접 설정하여 설정한 시간마다 다시 데이터를 리패칭 후 빌드
*/

/*
	[ Atomic Design Pattern ]
	- 컴포넌트를 원자처럼 최소단위로 쪼개서 재활용 가능하도록 처리하는 개발방법론

	단점: 컴포넌트간의 의존성이 생김, 특정 원자단위의 컴포넌트에서 문제 발생시 상위컴포넌트까지 모두 문제 발생소지

	1. Atoms (원자)
		- 버튼, 메뉴, 제목, 글자, 폼요소, 썸네일

	2. Molecules (분자)
		- 검색바 (폼, 버튼으로 구성된 기능단위)
		- 메뉴 (버튼)

	3. Organisms (유기체)
		- GNB (메뉴를 그룹화)

	4. Templates (템플릿)
		- 유기체들이 모여있는 기능덩어리

	5. Pages (페이지)
		- 템플릿으로 구성되어 있는 하나의 페이지
*/
