import { useGlobalData } from './useGlobalContext';

export const useThemeColor = () => {
	const { Theme } = useGlobalData();

	const ThemeColors = {
		theme1: {
			point: 'orange',
		},
		theme2: {
			point: 'hotpink',
		},
		theme3: {
			point: 'aquamarine',
		},
	};

	return ThemeColors[Theme];
};
