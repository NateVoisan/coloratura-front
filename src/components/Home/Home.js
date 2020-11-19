import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <div>
            <header role="banner">
                <h1>Coloratura</h1>
                <p>Playlists for anything.</p>
            </header>

            <section>
                <Link to="/playlists"><button>Playlists</button></Link>
                <Link to="/create"><button>Create</button></Link>
            </section >
            <section>
                <p>Sometimes we may want to listen to multiple songs, videos, or podcasts in a row while we are working, playing video games, or relaxing.
                    At the moment you are only able to make playlists through a complicated process within a single website. What if you wanted to use links
                    from many other websites but contained within the same playlist? Coloratura confronts this problem offering a simple and easy to use
                    application that can play through a list of many types of links.</p>
            </section>
        </div>
    );
}

export default Home;