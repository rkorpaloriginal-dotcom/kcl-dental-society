class IntersectionObserverMock {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

global.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;

import '@testing-library/jest-dom/vitest';

// Polyfill video element attributes that jsdom doesn't properly handle
const videoAttributes = ['muted', 'autoplay', 'loop', 'playsinline', 'controls'];
videoAttributes.forEach((attr) => {
  Object.defineProperty(HTMLVideoElement.prototype, attr, {
    get() {
      return this.hasAttribute(attr);
    },
    set(value: boolean) {
      if (value) {
        this.setAttribute(attr, '');
      } else {
        this.removeAttribute(attr);
      }
    },
  });
});
