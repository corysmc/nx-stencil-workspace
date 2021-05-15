import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'core',
  taskQueue: 'async',
  plugins: [sass()],
  outputTargets: [
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
};
