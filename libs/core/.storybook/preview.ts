import { setCustomElements } from '@storybook/web-components';
import { extractArgTypes, extractComponentDescription } from './extract-args';
import customElements from '../../../dist/libs/core/custom-elements.json';
import { defineCustomElements } from '../../../dist/libs/core/loader';

defineCustomElements();
export const parameters = {
  controls: {
    expanded: true,
    hideNoControlsWarning: true,
  },
  docs: {
    extractArgTypes,
    extractComponentDescription,
    inlineStories: true,
  },
};
setCustomElements(customElements);