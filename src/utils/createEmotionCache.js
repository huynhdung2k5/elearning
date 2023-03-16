// ----------------------------------------------------------------------
// Tạo emotion cache
// ----------------------------------------------------------------------
import createCache from '@emotion/cache';

// ----------------------------------------------------------------------

const isBrowser = typeof document !== 'undefined'; // check có phải trình duyệt không

export default function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector('meta[name="emotion-insertion-point"]');
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'css', insertionPoint });
} // tạo emotion Cache
