import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getRecipeByCategory = async ({ queryKey }) => {
	const { data } = await axios.get(`/filter.php?c=${queryKey[1]}`);
	// 해당 커스텀훅으로 호출되는 fetching 함수가 만약 컴포넌트가 마운트되자마자 호출된다면
	// data값 자체가 없기때문에 meals에서 undefined 오류 발생을 피하기 위함
	return data?.meals || [];
};

export const useRecipeByCategory = (selectedCategory) => {
	return useQuery(
		['recipeByCategory', selectedCategory],
		getRecipeByCategory,
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			cacheTime: 0,
			staleTime: 0,
			retry: 3, // 데이터 요청시도 횟수 (default: 3, 네트워크 상황이 안좋을 때 재시도횟수를 늘림)
			enabled: true, // 해당 useQuery의 호출 유무 (default: true - true일 경우 실행)
		}
	);
};
