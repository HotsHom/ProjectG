import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Apps from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import Route from "react-router-dom/es/Route";

const App = () => (
    <div>
    <BrowserRouter>
    <div>
        <Route path="/tacos" component={Tacos} />
    </div>
    </BrowserRouter>
    <div>
        <a href="/tacos">Hello</a>
    </div>
    </div>
);

// when the url matches `/tacos` this component renders
const Tacos = ({ match }) => (
    // here's a nested div
    <div>
        Тест
    </div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
