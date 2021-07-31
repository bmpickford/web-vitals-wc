import { html, fixture, expect } from '@open-wc/testing';
import { PerformanceGuage } from '../src/PerformanceGuage.js';
import '../index.js';

describe('WebVitalsWC', () => {
  it('passes the a11y audit', async () => {
    const el = await fixture<PerformanceGuage>(
      html`<performance-guage .label=${'fcp'}></performance-guage>`
    );
    await expect(el).shadowDom.to.be.accessible();
  });

  it('shows undefined svg when no value is set', async () => {
    const el = await fixture<PerformanceGuage>(
      html`<performance-guage .label=${'fcp'}></performance-guage>`
    );
    const undefinedSVG = el.shadowRoot?.querySelector('.guage-undefined');
    await expect(undefinedSVG).not.to.be.undefined;
    await expect(undefinedSVG).not.to.be.null;
  });

  it('shows pass svg when value is below first breakpoint', async () => {
    const el = await fixture<PerformanceGuage>(
      html`<performance-guage .label=${'fcp'} .value=${1}></performance-guage>`
    );
    const passSVG = el.shadowRoot?.querySelector('.guage-green');
    await expect(passSVG).to.not.be.undefined;
    await expect(passSVG).to.not.be.null;
  });

  it('shows average svg when value exceeds first breakpoint', async () => {
    const el = await fixture<PerformanceGuage>(
      html`<performance-guage
        .label=${'fcp'}
        .value=${1800}
      ></performance-guage>`
    );
    const avgSVG = el.shadowRoot?.querySelector('.guage-orange');
    await expect(avgSVG).to.not.be.undefined;
    await expect(avgSVG).to.not.be.null;
  });

  it('shows fail svg when value exceeds second breakpoint', async () => {
    const el = await fixture<PerformanceGuage>(
      html`<performance-guage
        .label=${'fcp'}
        .value=${3000}
      ></performance-guage>`
    );
    const failSVG = el.shadowRoot?.querySelector('.guage-red');
    await expect(failSVG).to.not.be.undefined;
    await expect(failSVG).to.not.be.null;
  });
});
