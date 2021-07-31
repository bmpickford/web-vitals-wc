import { html, TemplateResult } from 'lit';
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

interface ArgTypes {
  title?: string;
  counter?: number;
  textColor?: string;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = () => html`<web-vitals-wc></web-vitals-wc>`;

export const Default = Template.bind({});
