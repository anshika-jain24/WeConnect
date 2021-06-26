import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CallApp from '../src/components/App/App';
import App from './App';
import MainApp from './MainApp';
import * as serviceWorker from './serviceWorker';
import {StateProvider} from './StateProvider';
import initialState from "./reducer";
import reducer from "./reducer";
ReactDOM.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();