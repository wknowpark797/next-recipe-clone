import Layout from '@/components/template/Layout/Layout';
import '@/styles/globals.scss';
import axios from 'axios';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/router';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { keepStyle } from '@/libs/keepStyle';
keepStyle(2000);

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
	const router = useRouter();

	return (
		<QueryClientProvider client={queryClient}>
			<AnimatePresence mode='wait'>
				<motion.div key={router.pathname}>
					<Layout>
						<Component {...pageProps} />
					</Layout>

					{/* 페이지가 바뀔 때 나타날 프레임 */}
					<motion.div
						className='in'
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 0 }}
						exit={{ scaleX: 1 }}
						transition={{
							duration: 0.7,
							ease: [cubicBezier(0.25, 0.1, 0.03, 0.99)],
						}}
					></motion.div>

					{/* 페이지가 바뀐 후 사라질 프레임 */}
					<motion.div
						className='out'
						initial={{ scaleX: 1 }}
						animate={{ scaleX: 0 }}
						exit={{ scaleX: 0 }}
						transition={{
							duration: 0.7,
							ease: [cubicBezier(0.25, 0.1, 0.03, 0.99)],
						}}
					></motion.div>
				</motion.div>
			</AnimatePresence>

			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

/*
	Next 동작방식 ssg, isr 방식으로 프리렌더링되서 만들어지는 페이지는 
	프리렌더링 방식으로 구현되어 있는 페이지들을 이벤트가 발생하지 않더라도 라우터 설정되어 있는 메뉴에 호버하면
	해당 데이터를 확인한걸로 예측해서 미리 prefetching 처리한다.
	해당 페이지 컴포넌트가 라우터명이 변경되서 unmount될 때마다 다음에 prefetch할 데이터 용량을 최소화하기 위해서 style노드를 제거한다.

	Framer-motion AnimatePresence를 이용해서 모션이 끝날때까지 이전 컴포넌트의 unmount 시점을 강제로 holding하고 있으면
	이미 스타일 제거된 지저분한 페이지가 화면에 계속 노출되는 문제가 발생
	-> 정적인 스타일은 문제가 없지만 자바스크립트가 동적으로 제어하는 module.scss, styled-component, tailwindCSS에서 모두 위와 같은 문제 발생

	[ 해결방법 ]
	라우터가 변경되는 시점마다 unmount되서 스타일이 날아가기 직전에 해당 스타일 노드를 head에서부터 복사한 후
	next 고유 속성명을 제거한다.
	복사한 style node를 다시 강제로 head에 삽입
	이렇게 복사된 style node는 next가 제거할 수 없으므로 라우터가 변경되더라도 복사된 스타일이 유지되기 때문에 스타일도 유지할 수 있다.
	transition이 끝나서 이전 페이지 컴포넌트가 unmount되는 시점에 강제로 복사했던 스타일 노드를 다시 제거한다.
	해당 기능을 함수로 만들어 root 컴포넌트에서 라우터가 변경될때마다 호출한다.
*/

/*
	[ 컴포넌트 렌더링 호출 순서 ]
	1. _app.js에서 공통의 Layout 템플릿 컴포넌트를 가져와서 전체 컴포넌트를 wrapping 처리
	2. _app.js에 있는 Component는 page 폴더 안쪽에 있는 각각의 페이지 컴포넌트를 의미
	3. 모든 페이지 컴포넌트에는 Layout 컴포넌트의 공통의 구조가 적용됨
	4. 각각의 페이지 컴포넌트에서 페이지별로 들어갈 컨텐츠 추가
*/

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
