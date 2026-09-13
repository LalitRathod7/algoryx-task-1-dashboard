import { useEffect } from "react";

/**
 * Calls `onOutsideClick` when a click/touch happens outside of `ref`.
 * Used by the notifications panel and profile menu so they close
 * when the user clicks anywhere else on the page.
 */
export default function useClickOutside(ref, onOutsideClick) {
  useEffect(() => {
    function handlePointerDown(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [ref, onOutsideClick]);
}
