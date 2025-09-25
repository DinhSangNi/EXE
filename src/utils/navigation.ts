import type { NavigateFunction } from 'react-router-dom';

export const navigateWithScrollToTop = (
  navigate: NavigateFunction,
  path: string,
  options?: { replace?: boolean; state?: any }
) => {
  // Navigate to the new path
  navigate(path, options);
  
  // Scroll to top after navigation
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
};

export default navigateWithScrollToTop;