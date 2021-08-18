import { html, css, LitElement, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Type of metric for the guage to use
 * @typedef ({'lcp'|'fid'|'cls'|'fcp'|'ttfb'}) PerformanceType
 */
export type PerformanceType = 'lcp' | 'fid' | 'cls' | 'fcp' | 'ttfb';

type Breakpoints = {
  [key in PerformanceType]: number[];
};

const breakpoints: Breakpoints = {
  // https://web.dev/vitals/
  lcp: [2500, 4000],
  fid: [100, 300],
  cls: [0.1, 0.25],
  // https://web.dev/fcp/
  fcp: [1800, 3000],
  // https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/server-response-time.js
  ttfb: [100, 600],
};

const LinkForLabel = (label: PerformanceType): string => {
  switch (label) {
    case 'lcp':
    case 'fid':
    case 'cls':
      return 'https://web.dev/vitals/';
    case 'fcp':
      return 'https://web.dev/fcp/';
    case 'ttfb':
      return 'https://web.dev/time-to-first-byte/';
    default:
      return 'https://web.dev/metrics/';
  }
};

/**
 * @tag performance-guage
 * @description Guage for a performance metric as a web component
 *
 * @property {PerformanceType} label type of metric for the guage to use
 * @property {number} value value in ms for the guage to display. If undefined the N/A guage will display
 */
@customElement('performance-guage')
export class PerformanceGuage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .guage-div {
      height: 120px;
      width: 120px;
    }

    .gauge-base {
      opacity: 0.1;
    }

    .gauge-arc {
      fill: none;
      animation-delay: 250ms;
      stroke-linecap: round;
      transform: rotate(-90deg);
      transform-origin: 100px 60px;
      animation: load-gauge 1s ease forwards;
    }
    .guage-text {
      font-size: 24px;
      font-family: monospace;
      text-align: center;
    }
    .guage-red {
      color: #ff4e42;
      fill: #ff4e42;
      stroke: #ff4e42;
    }
    .guage-orange {
      color: #ffa400;
      fill: #ffa400;
      stroke: #ffa400;
    }
    .guage-green {
      color: #0cce6b;
      fill: #0cce6b;
      stroke: #0cce6b;
    }
    .guage-undefined {
      color: #5c5c5c;
      fill: #5c5c5c;
      stroke: #5c5c5c;
    }
    .guage-title {
      stroke: none;
      font-size: 26px;
      line-height: 26px;
      font-family: Roboto, Halvetica, Arial, sans-serif;
    }
    @keyframes load-gauge {
      from {
        stroke-dasharray: 0 352.858;
      }
    }
    .lh-gauge--pwa__disc {
      fill: #e0e0e0;
    }
    .lh-gauge--pwa__logo {
      position: relative;
      fill: #b0b0b0;
    }
    .lh-gauge--pwa__invisible {
      display: none;
    }
    .lh-gauge--pwa__visible {
      display: inline;
    }
    .guage-invisible {
      display: none;
    }
  `;

  connectedCallback() {
    // @ts-ignore
    if (super.connectedCallback) super.connectedCallback();
    if (!this.label) {
      throw new Error('"label" attribute is required for "performance-guage"');
    }
  }

  @property()
  label?: PerformanceType;

  @property({ type: Number })
  value?: number;

  render() {
    if (!this.label)
      throw new Error('"label" attribute is required for "performance-guage"');
    if (!this.value) return html`${this._renderUndefinedGuageSVG(this.label)}`;

    const breakpoint = breakpoints[this.label];
    if (this.value < breakpoint[0])
      return html`${this._renderPassGuageSVG(this.label, this.value)}`;
    if (this.value < breakpoint[1])
      return html`${this._renderAverageGuageSVG(this.label, this.value)}`;
    return html`${this._renderFailGuageSVG(this.label, this.value)}`;
  }

  _renderPassGuageSVG = (
    label: PerformanceType,
    value: number
  ) => svg`<svg class="guage-div guage-perf guage-green" viewBox="0 0 200 200" width="200" height="200" x="100" y="0">
    <circle class="gauge-base" r="56" cx="100" cy="60" stroke-width="8"></circle>
    <circle class="gauge-arc guage-arc-1" r="56" cx="100" cy="60" stroke-width="8" style="stroke-dasharray: 334.2651, 351.858;"></circle>
    <text class="guage-text" x="100px" y="60px" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${value}ms</text>
    <a href=${LinkForLabel(label)} target="_blank">
      <text class="guage-title" x="100px" y="160px" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${label.toUpperCase()}</text>
    </a>
  </svg>`;

  _renderAverageGuageSVG = (
    label: PerformanceType,
    value: number
  ) => svg`<svg class="guage-div guage-acc guage-orange" viewBox="0 0 200 200" width="200" height="200" x="300" y="0">
    <circle class="gauge-base" r="56" cx="100" cy="60" stroke-width="8"></circle>
    <circle class="gauge-arc guage-arc-2" r="56" cx="100" cy="60" stroke-width="8" style="stroke-dasharray: 263.89349999999996, 351.858;"></circle>
    <text class="guage-text" x="100px" y="60px" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${value}ms</text>
    <a href=${LinkForLabel(label)} target="_blank">
      <text class="guage-title" x="100px" y="160px" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${label.toUpperCase()}</text>
    </a>
  </svg>`;

  _renderFailGuageSVG = (
    label: PerformanceType,
    value: number
  ) => svg`<svg class="guage-div guage-best guage-red" viewBox="0 0 200 200" width="200" height="200" x="500" y="0">
    <circle class="gauge-base" r="56" cx="100" cy="60" stroke-width="8"></circle>
    <circle class="gauge-arc guage-arc-3" r="56" cx="100" cy="60" stroke-width="8" style="stroke-dasharray: 168.89184, 351.858;"></circle>
    <text class="guage-text" x="100px" y="60px" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${value}ms</text>
    <a href=${LinkForLabel(label)} target="_blank">
      <text class="guage-title" x="100px" y="160px" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${label.toUpperCase()}</text>
    </a>
  </svg>`;

  _renderUndefinedGuageSVG = (
    label: PerformanceType
  ) => svg`<svg class="guage-div guage-seo guage-undefined" viewBox="0 0 200 200" width="200" height="200" x="700" y="0">
    <circle class="gauge-base" r="56" cx="100" cy="60" stroke-width="8"></circle>
    <circle class="gauge-arc guage-arc-4" r="56" cx="100" cy="60" stroke-width="8" style="stroke-dasharray: 351.858, 351.858;"></circle>
    <text class="guage-text" x="100px" y="60px" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">NA</text>
    <a href=${LinkForLabel(label)} target="_blank">
      <text class="guage-title" x="100px" y="160px" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${label.toUpperCase()}</text>
    </a>
    </svg>`;
}
