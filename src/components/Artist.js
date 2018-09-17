import React from 'react';

const Artist = props => {

    return (
        <React.Fragment>
            <h5>Your Fav Artists</h5>
            <ol className="center-list">
                {props.favArtists && props.favArtists.map(artist => <li key={artist.id}>{artist.name}</li>)}
            </ol>
        </React.Fragment>
    );

};

export default Artist;
