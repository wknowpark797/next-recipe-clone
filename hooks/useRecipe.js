import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Category
const getRecipeByCategory = async ({ queryKey }) => {
	const { data } = await axios.get(`/filter.php?c=${queryKey[1]}`);
	// 해당 커스텀훅으로 호출되는 fetching 함수가 만약 컴포넌트가 마운트되자마자 호출된다면
	// data값 자체가 없기때문에 meals에서 undefined 오류 발생을 피하기 위함
	return data?.meals || [];
};

// 카테고리명으로 레시피 데이터 fetching
// -> 추가로 debounce되는 search값을 가져온다.
export const useRecipeByCategory = (
	DebounceCategory,
	DebounceSearch
) => {
	return useQuery(
		['recipeByCategory', DebounceCategory],
		getRecipeByCategory,
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			cacheTime: 1000 * 60 * 60 * 24,
			staleTime: 1000 * 60 * 60 * 24,
			/*
				[ retry ]
				- 데이터 요청시도 횟수 (default: 3, 네트워크 상황이 안좋을 때 재시도횟수를 늘림)
			*/
			retry: 3,
			/*
				[ enabled ]
				- 해당 useQuery의 호출 유무 (default: true - true일 경우 실행)
				- enabled 값에는 truthy, falsy 값이 적용되지 않는다. (직접 boolean값을 생성해서 지정)
				- 지금 상황에서는 SSG방식으로 초기 데이터를 호출하고 있기 때문에 아래 구문을 지정하지 않아도 잘 동작된다.
				- CSR 방식으로 호출 할 때는 초기값이 undefined이기 때문에 발생하는 에러를 미리 방지
			*/
			// search값이 비어있을때 동작
			// 사용자가 검색어 요청중일 때 카테고리 요청을 중지시키기 위함
			enabled: DebounceSearch === '',
		}
	);
};

// Search
const getRecipeBySearch = async ({ queryKey }) => {
	const { data } = await axios.get(`/search.php?s=${queryKey[1]}`);
	return data?.meals || [];
};

// 검색어로 레시피 데이터 fetching
export const useRecipeBySearch = (DebounceSearch) => {
	return useQuery(
		['recipeBySearch', DebounceSearch],
		getRecipeBySearch,
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			cacheTime: 1000 * 60 * 60 * 24,
			staleTime: 1000 * 60 * 60 * 24,
			retry: 3,
			// search값이 비어있지 않을때 동작
			enabled: DebounceSearch !== '', // 인수로 들어온 input값이 빈 문자열이면 실행불가 처리
		}
	);
};

// 아이디값으로 상세 레시피 fetch
const getRecipeById = async ({ queryKey }) => {
	const { data } = await axios.get(`/lookup.php?i=${queryKey[1]}`);
	return data?.meals[0] || '';
};
export const useRecipeById = (DebounceId) => {
	return useQuery(['recipeById', DebounceId], getRecipeById, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3,
	});
};
