import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { applyPolyfills, defineCustomElements } from '../../../dist/libs/core/loader';

ReactDOM.render(<App />, document.getElementById('root'));

applyPolyfills().then(() => {
  defineCustomElements();
});