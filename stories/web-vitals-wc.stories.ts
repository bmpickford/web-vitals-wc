import { html, TemplateResult } from 'lit-element';
import '../index.js';

export default {
  title: 'WebVitalsWC',
  component: 'web-vitals-wc',
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const MarginWrapper = (child: TemplateResult) =>
  html`<div style="margin-top: 200px">${child}</div>`;
const Template: Story<ArgTypes> = () =>
  MarginWrapper(html`<web-vitals-wc></web-vitals-wc>`);

export const Default = Template.bind({});
