import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CallApp from './components/CallApp/CallApp';
import App from './App';
import MainMainApp from './MainMainApp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <MainMainApp />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();