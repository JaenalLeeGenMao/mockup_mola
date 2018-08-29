import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import JQuery from 'jquery';

import Home from '@module/home';

import './App.css';

window.$ = window.JQuery = JQuery;

class App extends Component {
    render() {
        return (
        <Fragment>
            <Router>
                <Route exact path="/" component={Home} />
            </Router>
        </Fragment>
        );
    }
}

export default App;
