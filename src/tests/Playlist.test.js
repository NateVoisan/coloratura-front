import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Playlist from '../components/Playlist/Playlist';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <Playlist />
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
});