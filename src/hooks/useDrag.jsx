import { useState, useCallback } from 'react';

export const useDrag = (initialWidth, initialHeight) => {
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);

    const handleHorizontalDrag = useCallback((e) => {
        e.preventDefault();

        const handleHorizontalDragProgress = (e) => {
            const container = document.getElementById("content");
            const containerWidth = container.offsetWidth;
            const newPosition = ((e.clientX - 110) / containerWidth) * 100;
            setWidth(newPosition);
        };

        document.getElementById("content").addEventListener("mousemove", handleHorizontalDragProgress);
        document.getElementById("content").addEventListener("mouseup", () => {
            document.getElementById("content").removeEventListener("mousemove", handleHorizontalDragProgress);
        });
    }, []);

    const handleVerticalDrag = useCallback((e) => {
        e.preventDefault();

        const handleVerticalDragProgress = (e) => {
            const container = document.getElementById("right_side");
            const containerHeight = container.offsetHeight;
            const newPosition = ((e.clientY - 120) / containerHeight) * 100;
            setHeight(newPosition);
        };

        document.getElementById("right_side").addEventListener("mousemove", handleVerticalDragProgress);
        document.getElementById("right_side").addEventListener("mouseup", () => {
            document.getElementById("right_side").removeEventListener("mousemove", handleVerticalDragProgress);
        });
    }, []);

    return { width, height, handleHorizontalDrag, handleVerticalDrag };
};