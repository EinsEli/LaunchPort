/*
 * USE-IS-MOBILE HOOK
 * This file provides a custom hook for determining if the current device is a mobile device.
 */
"use client";
import { useState, useEffect } from "react";

const useIsMobile = (width: number = 640) => {
	const [matches, setMatches] = useState(undefined as boolean | undefined);

	useEffect(() => {
		const media = window.matchMedia(`(max-width: ${width}px)`);
		if (media.matches !== matches) {
			setMatches(media.matches);
		}
		const listener = () => setMatches(media.matches);
		window.addEventListener("resize", listener);
		return () => window.removeEventListener("resize", listener);
	}, [matches, width]);

	return matches;
};

export default useIsMobile;
