import React from 'react';

const CommonArtists = props => {
    return (
        <React.Fragment>
            {props.commonArtists.map(artist => <li className="center-list" key={artist.id}>{artist.name}</li>)}
        </React.Fragment>
    );
};

export default CommonArtists;
