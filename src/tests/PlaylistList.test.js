import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PlaylistList from '../components/PlaylistList/PlaylistList';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <PlaylistList />
        </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
});