import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CreatePlaylist from '../components/CreatePlaylist/CreatePlaylist';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <CreatePlaylist />
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
});