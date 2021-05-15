import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { applyPolyfills, defineCustomElements } from '@my-org/core/loader';

ReactDOM.render(<App />, document.getElementById('root'));

applyPolyfills().then(() => {
  defineCustomElements();
});
// @todo applyPolyfills & defineCustomElements only needed until this is fixed: https://github.com/nxext/nx-extensions/issues/235
