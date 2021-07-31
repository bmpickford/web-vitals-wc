import { html, fixture, expect } from '@open-wc/testing';

import { WebVitalsWC } from '../src/WebVitalsWc.js';
import '../index.js';

describe('WebVitalsWC', () => {
  it('passes the a11y audit', async () => {
    const el = await fixture<WebVitalsWC>(
      html`<web-vitals-wc></web-vitals-wc>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });

  it('should render all 5 metrics', async () => {
    const el = await fixture<WebVitalsWC>(
      html`<web-vitals-wc></web-vitals-wc>`
    );
    const guages = el.shadowRoot?.querySelectorAll('performance-guage');
    await expect(guages?.length).to.eq(5);
  });
});
