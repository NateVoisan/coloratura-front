import React from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'

const Home = () => {
    return (
        <AuthContext.Consumer>
        {(auth) => (
            <div>
            <header role="banner" className='homepage'>
                <h1>Coloratura</h1>
                <p>Playlists for anything.</p>

                {auth.token 
                    ? <React.Fragment><Link to="/playlists"><button>Playlists</button></Link>
                        <Link to="/create"><button>Create</button></Link></React.Fragment>
                    : null}
                


            </header>

            {/* <section className='homebuttons'>
                
            </section > */}

            <section className='homeabout'>
                <p>Sometimes we may want to listen to multiple songs, videos, or podcasts in a row while we are working, playing video games, or relaxing.
                    At the moment you are only able to make playlists through a complicated process within a single website. What if you wanted to use links
                    from many other websites but contained within the same playlist? Coloratura confronts this problem offering a simple and easy to use
                    application that can play through a list of many types of links.</p>
            </section>

            <footer className='footer'>
                <p>© Coloratura</p>
            </footer>
        </div>
        )}
        
        </AuthContext.Consumer>
    );
}

export default Home;