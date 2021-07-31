import { html, TemplateResult } from 'lit-element';
import { PerformanceType } from '../src/PerformanceGuage.js';
import '../index.js';

export default {
  title: 'PerformanceGuage',
  component: 'performance-guage',
  argTypes: {
    label: {
      description: 'Performance metric for the guage',
      control: { type: 'string' },
      defaultValue: 'fcp',
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  label: PerformanceType;
  value?: number;
}

const Template: Story<ArgTypes> = ({ label, value }) =>
  html`<performance-guage .label=${label} .value=${value}></performance-guage>`;

export const NoValue = Template.bind({});
export const FCP = Template.bind({});
FCP.args = { label: 'fcp', value: 10 };

export const LCP = Template.bind({});
LCP.args = { label: 'lcp', value: 10 };

export const FID = Template.bind({});
FID.args = { label: 'fid', value: 10 };

export const CLS = Template.bind({});
CLS.args = { label: 'cls', value: 0.01 };

export const TTFB = Template.bind({});
TTFB.args = { label: 'ttfb', value: 10 };

export const Average = Template.bind({});
Average.args = { label: 'lcp', value: 2500 };

export const Fail = Template.bind({});
Fail.args = { label: 'lcp', value: 4000 };
