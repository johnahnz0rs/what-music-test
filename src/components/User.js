import React from 'react';
import Profile from './Profile';
import FindCommon from './FindCommon';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            showProfile: false,
            showFindCommon: false
        };
        this.goToProfile = this.goToProfile.bind(this);
        this.goToFindCommon = this.goToFindCommon.bind(this);
        this.getMyTopGenres = this.getMyTopGenres.bind(this);
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search);
        const accessToken = searchParams.get('access_token');

        const config = {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        // get my profile info;
        fetch('https://api.spotify.com/v1/me', config)
            .then(res => res.json())
            .then(data => {
                const user = {
                    spotifyID: data.id,
                    display_name: data.display_name,
                    email: data.email,
                    image: data.image,
                    spotify_url: data.external_urls.spotify,
                    favGenres: []
                };

                // get my topArtists;
                fetch('https://api.spotify.com/v1/me/top/artists?limit=50', config)
                    .then(res => res.json())
                    .then(artists => {
                        // make a sorted list (by popularity) of favArtists;
                        user.favArtists = artists.items.sort((a,b) => {
                            return b.popularity - a.popularity;
                        });
                        // make a sorted list (by count) of favGenres;
                        user.favGenres = this.getMyTopGenres(artists.items);
                        console.log('*** this is the user ***', user);
                        // update state.user;
                        this.setState({user});
                        // create postConfig, aka saveConfig;
                        const saveConfig = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(user)
                        };
                        // save user to dbase;
                        fetch('http://localhost:8888/api/user', saveConfig)
                            .then(() => console.log('saved successfully'))
                            .catch(err => console.log(err));
                    });
            });
    }

    goToProfile() {
        this.setState({ showProfile: true });
        this.setState({ showFindCommon: false });
    }

    goToFindCommon() {
        this.setState({ showFindCommon: true });
        this.setState({ showProfile: false });
    }

    getMyTopGenres(artists) {
        let genres = {};
        let genresArray = [];
        // make an object of objects {genre:count};
        for (let artist of artists) {
            if (artist.genres.length > 0) {
                for (let genre of artist.genres) {
                    (!Object.keys(genres).includes(genre)) ? genres[genre] = 1 : genres[genre]+= 1;
                }
            }
        }
        // iterate through genres object, push new object {genre: genre, count: count} to genresArray;
        for (let i of Object.keys(genres)) {
            genresArray.push({genre: i, count: genres[i]})
        }
        // then sort genresArray;
        genresArray = genresArray.sort((a, b) => { return b.count - a.count });
        // console.log('*** this is getMyTopGenres printing genresArray(sorted) ***', genresArray);
        return genresArray;
    }

    render() {
        return (
            <React.Fragment>
                <div className="row center">
                    <h3 className="greeting-header">Hello, {this.state.user.display_name}</h3>
                </div>

                <div className="row">
                    <div className="col s6">
                        <button className="waves-effect waves-dark btn btn-prof-find-common" onClick={this.goToProfile}><i className="material-icons left">cloud</i>My Profile</button>
                    </div>
                    <div className="col s6">
                        <button className="waves-effect waves-dark btn btn-prof-find-common" onClick={this.goToFindCommon}><i className="material-icons left">cloud</i>compare music with a friend</button>
                    </div>
                </div>

                <div className="row displayProfileOrMatch">
                    {this.state.showProfile && this.state.user && <Profile profile={this.state.user} />}
                    {this.state.showFindCommon && this.state.user.favArtists && <FindCommon me={this.state.user} />}
                </div>

            </React.Fragment>
        );
    }
}

export default User;
