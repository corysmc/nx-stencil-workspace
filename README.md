

# NX Stencil Workspace Demo

This project was generated using [Nx](https://nx.dev).

**Project Contains**
1. StencilJS component library `nx run core:serve`
  * Storybook setup with live reloading `nx run core:serve-storybook`
    * You'll see an error first time serving that says `The "id" argument must be of type string. Received undefined`
    * IMPORTANT: workaround to get this working
    * Open `node_modules/@nrwl/storybook/src/executors/utils.js`
    * Add `'@storybook/web-components': '@storybook/web-components/dist/cjs/server/options',` as an option for serverOptionsPaths.
2. Ionic React app that imports a stencil component compiled for react `nx run ionic-react-app:serve`
3. Ionic Stencil PWA that imports the stencil component `nx run ionic-stencil-pwa:serve`
4. React app `nx run react-app:serve`
5. 
