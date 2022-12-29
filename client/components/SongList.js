// import { divide } from "lodash";
import React, { Component } from "react";
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSongs from '../queries/fetchSongs';
import deleteSong from "../queries/deleteSong";

class SongList extends Component {
    onSongDelete(event, id) {
        event.preventDefault();

        this.props.mutate( {
            variables: {
                id
            }
            // },refetchQueries: [{ query: fetchSongs }]
        })
        .then( () => this.props.data.refetch() )
    }

    renderSongs() {
        return this.props.data.songs.map(({ id, title}) => {
            return  (
                <li  key={ id } id={ id }className="collection-item">
                    { title }
                    { ` ${ id }` }
                    <i
                        className="material-icons"
                        onClick={ (event) => this.onSongDelete(event, id) }
                    >
                        delete
                    </i>
                </li>

            )
        });
    }

    render() {
        if(this.props.data.loading) { return <div>Loading...</div>}

        return (
            <div>
                <ul className="collection">
                    { this.renderSongs() }
                </ul>

                <Link
                    to="songs/new"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

export default graphql(fetchSongs)(
    graphql(deleteSong)(SongList)
);