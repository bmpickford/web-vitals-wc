import { html, css, LitElement, svg } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getLCP, getFID, getCLS, getFCP, getTTFB } from 'web-vitals';

import './PerformanceGuage.js';

const perfSVG = svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
</svg>`;

const infoSVG = svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info">
  <circle cx="12" cy="12" r="10"></circle>
  <line x1="12" y1="16" x2="12" y2="12"></line>
  <line x1="12" y1="8" x2="12.01" y2="8"></line>
</svg>`;

// https://github.com/GoogleChrome/web-vitals#browser-support
// CLS and LCP are only available on Chromium browsers. Not aiming to support IE
const isChromiumBrowser = () => {
  if (typeof navigator === 'undefined') return true;
  const { userAgent } = navigator;

  if (
    userAgent.indexOf('SamsungBrowser') > -1 ||
    userAgent.indexOf('Opera') > -1 ||
    userAgent.indexOf('OPR') > -1 ||
    userAgent.indexOf('Edg') > -1 ||
    userAgent.indexOf('Chrome') > -1
  ) {
    return true;
  }
  return false;
};

const infoClickHandler = () => {
  const url = `https://developers.google.com/speed/pagespeed/insights/?url=${window.location.href}`;
  window.open(url, '_blank')?.focus();
};

/**
 * @tag web-vitals-wc
 * @description Web component to display web vitals for your page
 */
@customElement('web-vitals-wc')
export class WebVitalsWC extends LitElement {
  static styles = css`
    :host {
      display: block;
      --bg-color: transparent;
      --text-color: unset;
    }

    .container {
      position: absolute;
    }

    .box {
      box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
      border-radius: 4pt;
      background-color: var(--bg-color);
      color: var(--text-color);
    }

    .hoverable {
      cursor: pointer;
    }

    .hoverable:hover + div {
      opacity: 1;
      display: flex;
      animation: fade 0.4s;
    }

    .performance {
      display: none;
      opacity: 0;
      width: max-content;
      padding: 4pt 8pt;
      position: absolute;
      top: -140px;
    }

    .performance:hover {
      opacity: 1;
      display: flex;
      animation: fade 0.4s;
    }

    .info {
      cursor: pointer;
      margin-bottom: 0;
      margin-top: auto;
    }

    @keyframes fade {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `;

  @state()
  _cls?: number;

  @state()
  _fid?: number;

  @state()
  _lcp?: number;

  @state()
  _fcp?: number;

  @state()
  _ttfb?: number;

  connectedCallback() {
    // @ts-ignore
    if (super.connectedCallback) super.connectedCallback();
    getCLS(metric => {
      this._cls = Math.round(metric.value);
    }, true);
    getFID(metric => {
      this._fid = Math.round(metric.value);
    }, true);
    getLCP(metric => {
      this._lcp = Math.round(metric.value);
    }, true);
    getFCP(metric => {
      this._fcp = Math.round(metric.value);
    }, true);
    getTTFB(metric => {
      this._ttfb = Math.round(metric.value);
    });
  }

  render() {
    return html`
      <div class="container">
        <span class="hoverable">${perfSVG}</span>
        <div class="performance box">
          <performance-guage
            .label=${'fcp'}
            .value=${this._fcp}
          ></performance-guage>
          <performance-guage
            .label=${'ttfb'}
            .value=${this._ttfb}
          ></performance-guage>
          <performance-guage
            .label=${'fid'}
            .value=${this._fid}
          ></performance-guage>
          ${isChromiumBrowser()
            ? html`
                <performance-guage
                  .label=${'lcp'}
                  .value=${this._lcp}
                ></performance-guage>
                <performance-guage
                  .label=${'cls'}
                  .value=${this._cls}
                ></performance-guage>
              `
            : undefined}
          <div
            class="info"
            @click=${infoClickHandler}
            @keyup=${infoClickHandler}
          >
            ${infoSVG}
          </div>
        </div>
      </div>
    `;
  }
}
