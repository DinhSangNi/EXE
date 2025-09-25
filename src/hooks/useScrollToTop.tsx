import { useEffect } from "react";

interface UseScrollToTopOptions {
    smooth?: boolean;
    dependencies?: any[];
}

export const useScrollToTop = ({
    smooth = false,
    dependencies = [],
}: UseScrollToTopOptions = {}) => {
    useEffect(() => {
        if (smooth) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.scrollTo(0, 0);
        }
    }, dependencies);

    const scrollToTop = (smoothScroll = smooth) => {
        if (smoothScroll) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.scrollTo(0, 0);
        }
    };

    return { scrollToTop };
};

export default useScrollToTop;
