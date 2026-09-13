import { useEffect, useState } from "react";

/**
 * Tracks whether a CSS media query currently matches.
 * Used to know when we've dropped to a mobile-width layout so the
 * sidebar can switch from "always visible" to "drawer that slides in".
 *
 * Example: const isMobile = useMediaQuery("(max-width: 1023px)");
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);

    // Support both modern and older Safari APIs
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", handleChange);
    } else {
      mediaQueryList.addListener(handleChange);
    }

    setMatches(mediaQueryList.matches);

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", handleChange);
      } else {
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
}
