import { useState, useRef } from 'react';

export const useDebounce = (value) => {
	const [Debounce, setDebounce] = useState(value);
	const eventBlocker = useRef(null);

	clearTimeout(eventBlocker.current);

	eventBlocker.current = setTimeout(() => {
		setDebounce(value);
	}, 500);

	return Debounce;
};
