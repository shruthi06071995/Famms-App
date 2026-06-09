import './index.css';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import React from 'react';
import ReactDom from 'react-dom/client'
import { Provider } from "react-redux";
import store from "./famms-front-end/redux/store.js";

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
