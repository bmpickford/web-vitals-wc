import { html, TemplateResult } from 'lit';
import '../index.js';

export default {
  title: 'PerformanceGuage',
  component: 'performance-guage',
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

const Template: Story<ArgTypes> = () =>
  html`<performance-guage></performance-guage>`;

export const Default = Template.bind({});
