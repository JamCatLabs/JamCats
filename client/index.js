import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
        <App/>,
    document.querySelector('#root')
);

//{/* <Provider store={store}>
 //   <App />
//</Provider>,  */}



