import React from 'react';
import ReactDOM from 'react-dom';
import questionForm from './components/questionForm';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <questionForm />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
