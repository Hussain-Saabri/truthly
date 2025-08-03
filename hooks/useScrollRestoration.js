// hooks/useScrollRestoration.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useScrollRestoration() {
  const router = useRouter();
  const scrollPositions = {};

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return;

    window.history.scrollRestoration = 'manual';

    const saveScrollPosition = (url) => {
      scrollPositions[url] = { x: window.scrollX, y: window.scrollY };
    };

    const restoreScrollPosition = (url) => {
      const pos = scrollPositions[url];
      if (pos) window.scrollTo(pos.x, pos.y);
    };

    const onRouteChangeStart = (url) => saveScrollPosition(router.asPath);
    const onRouteChangeComplete = (url) => restoreScrollPosition(url);

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router]);
}
