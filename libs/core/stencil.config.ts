import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import { generateJsonDocs } from './src/custom-element-doc-generator';

export const config: Config = {
  namespace: 'core',
  taskQueue: 'async',
  plugins: [sass()],
  outputTargets: [
    {
      type: 'custom',
      generator: generateJsonDocs,
      name: 'custom-element-docs',
    },
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      dir: '../../dist/libs/core/dist',
    },
    reactOutputTarget({
      componentCorePackage: '@my-org/core',
      proxiesFile: '../../../libs/core-react/src/index.ts',
      includeDefineCustomElements: false,
      // @todo includeDefineCustomElements should be true, once this is solved: https://github.com/nxext/nx-extensions/issues/235
    }),
  ],
  devServer: {
    openBrowser: false,
  },
  watchIgnoredRegex: RegExp('custom-elements.json') // prevents infinite loop of re-rendering when generating custom-elements.json
};
