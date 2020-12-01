import React, { Component } from 'react';

export default class SCMedia extends Component {


    render() {
        return (
            <div className="SCMedia">
                <iframe 
                    width="100%" 
                    height="300" 
                    scrolling="no" 
                    frameBorder="no" 
                    allow="autoplay"
                    title="Soundcloud"
                    src={this.props.track.link}>
                </iframe>
            </div>
        );
    };
};