import { useEffect, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
    callback: () => void,
    excludeRefs?: React.RefObject<HTMLElement>[],
) {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            const target = event.target as Node;

            if (ref.current && !ref.current.contains(target)) {
                const isClickInExcludedElement = excludeRefs?.some(
                    (excludeRef) =>
                        excludeRef.current &&
                        excludeRef.current.contains(target),
                );

                if (!isClickInExcludedElement) {
                    callback();
                }
            }
        }

        function handleKeyDown(event: KeyboardEvent): void {
            if (event.key === 'Escape') {
                callback();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [callback, excludeRefs]);

    return ref;
}
