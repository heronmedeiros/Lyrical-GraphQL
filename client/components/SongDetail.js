import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import LyricCreate from './LyricCreate';

import showSong from '../queries/showSong';

class SongDetail extends Component {
    render() {
        const  { song } = this.props.data;

        if(!song) { return <div>Loading...</div>}

        return(
            <div>
                <Link to="/">Back</Link>
                <h3>{ song.title }</h3>
                <LyricCreate songId={ this.props.params.id }/>
            </div>
        )
    }
}

export default graphql(showSong, {
    options: (props) => {
        return {
            variables: {
                id: props.params.id
            }
        }
    }
})(SongDetail);