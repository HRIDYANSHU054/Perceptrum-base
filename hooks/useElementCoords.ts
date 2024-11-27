import { useEffect } from "react";

export function useElementCoords(
  ref: React.RefObject<HTMLElement>,
  onPositionChange: (coords: DOMRect) => void
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Create ResizeObserver to watch for size/position changes
    const observer = new ResizeObserver(() => {
      const rect = element.getBoundingClientRect();
      onPositionChange(rect);
    });

    // Initial position
    onPositionChange(element.getBoundingClientRect());

    // Start observing
    observer.observe(element);

    // Cleanup
    return () => observer.disconnect();
  }, [ref, onPositionChange]);
}
