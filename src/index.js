import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from "mobx-react";
import 'bootstrap/dist/css/bootstrap.min.css';

import './style/index.css';
import App from './components/App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.register();
