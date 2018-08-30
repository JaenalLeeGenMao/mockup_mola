import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ParallaxProvider } from 'react-scroll-parallax';

import JQuery from 'jquery';

import Home from '@module/home';

import './App.css';

window.$ = window.JQuery = JQuery;

class App extends Component {
    render() {
        return (
        <ParallaxProvider>
            <Router>
                <Route exact path="/" component={Home} />
            </Router>
        </ParallaxProvider>
        );
    }
}

export default App;
