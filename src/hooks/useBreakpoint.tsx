import { useEffect, useState } from "react";

type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints: { name: Breakpoint; query: string }[] = [
    { name: "2xl", query: "(min-width: 1536px)" },
    { name: "xl", query: "(min-width: 1280px)" },
    { name: "lg", query: "(min-width: 1024px)" },
    { name: "md", query: "(min-width: 768px)" },
    { name: "sm", query: "(min-width: 640px)" },
];

const useBreakpoint = () => {
    const getCurrent = (): Breakpoint => {
        for (const bp of breakpoints) {
            if (window.matchMedia(bp.query).matches) {
                return bp.name;
            }
        }
        return "base";
    };

    const [currentBp, setCurrentBp] = useState<Breakpoint>(() => {
        // if (typeof window === undefined) return "base";
        return getCurrent();
    });

    useEffect(() => {
        const handlers: (() => void)[] = [];

        breakpoints.forEach((bp) => {
            const media = window.matchMedia(bp.query);
            const listener = () => {
                const newBp = getCurrent();
                if (newBp !== currentBp) setCurrentBp(newBp);
            };

            media.addEventListener("change", listener);
            handlers.push(() => media.removeEventListener("changel", listener));
        });

        return () => {
            handlers.forEach((cleanup) => {
                cleanup();
            });
        };
    }, [currentBp]);

    return currentBp;
};

export default useBreakpoint;
