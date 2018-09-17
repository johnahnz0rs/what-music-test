import React from 'react';

const CommonGenres = props => {

    console.log('*** this is commonGenres printing props.commonGenres ***', props.commonGenres);

    return (
        <React.Fragment>
            {props.commonGenres.map(genre => <li className="center-list" key={genre.genre}>{genre}</li>)}
        </React.Fragment>
    );

};

export default CommonGenres;
