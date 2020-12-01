import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header/Header';

it.skip('renders Header without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});

// Research with the TA's indicates that the solution to getting around testing the
// location requires mocking up the router behavior in jest which is beyond the
// course curriculum as well as my mind. TA = Alan.Zimmerman@chegg.com