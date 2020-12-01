import React from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const Home = () => {
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <div>
                    <header role="banner" className='homepage'>
                        <p className="description">: elaborate embellishment in vocal 
                            music broadly : music with ornate figuration</p>
                        <p className="slogan">Playlists for anything.</p>

                        {auth.token
                            ? <React.Fragment><Link to="/playlists"><button>Playlists</button></Link>
                                <Link to="/create"><button>Create</button></Link></React.Fragment>
                            : null}

                    </header>

                    <div className="demo">
                        <p>Demo Account:</p>
                        <p>Username - testuser01</p>
                        <p>Password - testuser01</p>
                    </div>

                    <section className='homeabout'>
                        <p>Sometimes we may want to listen to multiple songs, videos, or podcasts in a row while we are working, playing video games, or relaxing.
                        At the moment you are only able to make playlists through a complicated process within a single website. What if you wanted to use links
                        from many other websites but contained within the same playlist? Coloratura confronts this problem offering a simple and easy to use
                        application that can allow the user to sketch a playlist using links to various media sites.
                        Currently only Youtube and Bitchute are supported media types for the onboard media player. Additions of Soundcloud, Spotify, and Vimeo will be available in the future.</p>
                    </section>

                    <footer className='footer'>
                        © Coloratura
                    </footer>
                </div>
            )}
        </AuthContext.Consumer>
    );
};

export default Home;