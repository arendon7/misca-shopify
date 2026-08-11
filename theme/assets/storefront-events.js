import {
  createViewEventElement,
  PageViewEvent,
} from 'https://cdn.shopify.com/storefront/standard-events.js';

if (!customElements.get('s-view-event')) {
  customElements.define('s-view-event', createViewEventElement());
}

const dispatchPageView = () => {
  document.dispatchEvent(new PageViewEvent({
    page: {
      template: document.documentElement.dataset.pageType || '',
      title: document.title,
      url: window.location.href,
    },
  }));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', dispatchPageView, {once: true});
} else {
  dispatchPageView();
}
