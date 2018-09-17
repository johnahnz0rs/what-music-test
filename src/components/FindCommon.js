import React from 'react';
import CommonArtists from './CommonArtists';
import CommonGenres from './CommonGenres';

class FindCommon extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            me: props.me,
            searchEmail: '',
            compareFriend: {},
            artistsInCommon: [],
            genresInCommon: []
        }
        this.search = this.search.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.findCommonArtists = this.findCommonArtists.bind(this);
        this.findCommonGenres = this.findCommonGenres.bind(this);
        this.getFavGenres = this.getFavGenres.bind(this);
        this.printState = this.printState.bind(this);
    }

    componentDidMount() {
        console.log('*** compDidMount printing state ***', this.state);
    }


    inputHandler(event) {
        let name = event.target.name,
            value = event.target.value;
        this.setState({[name]: value})
    }

    search() {
        const config = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`http://localhost:8888/api/user/${this.state.searchEmail}`, config)
            .then(res => res.json())
            .then(friend => {
                this.setState({compareFriend: friend});
                this.findCommonArtists(friend);
                this.findCommonGenres(friend);
            });
    }

    findCommonArtists(friend) {
        console.log('*** FindCommon.findCommonArtists comparing with friend ***', friend);
        let commonArtists = [];

        // for each artist in friend's favArtists;
        for (let f in friend.favArtists) {
            //compare to each of my favArtists;
            for (let i in this.state.me.favArtists) {
                // if there's a match;
                if (friend.favArtists[f].id === this.state.me.favArtists[i].id) {
                    // then push to local array;
                    commonArtists.push({id: friend.favArtists[i].id, name: friend.favArtists[i].name});
                }
            }
        }
        // after all iterations, set state;
        this.setState({artistsInCommon: commonArtists});
    }

    findCommonGenres(friend) {
        // similar to findCommonArtists(), but for favGenres
        let commonGenres = [];
        if (!friend.favGenres.length) {
            friend.favGenres = this.getFavGenres(friend);
        }
        for (let f in friend.favGenres) {
            for (let i in this.state.me.favGenres) {
                if (friend.favGenres[f].genre === this.state.me.favGenres[i].genre) {
                    // console.log('** we got a matching genre here! ***');
                    commonGenres.push(friend.favGenres[f].genre);
                }
            }
        }
        this.setState({genresInCommon: commonGenres});
    }

    getFavGenres(friend) {
        let genres = {};
        let genresArray = [];

        // make an object of objects {genre:count};
        for (let artist of friend.favArtists) {
            if (artist.genres.length > 0) {
                for (let genre of artist.genres) {
                    if (!Object.keys(genres).includes(genre)) {
                        genres[genre] = 1;
                    } else {
                        genres[genre]+= 1;
                    }
                }
            }
        }
        // iterate through genres object, format and push new object {genre: genre, count: count} to genresArray;
        for (let i of Object.keys(genres)) {
            genresArray.push({genre: i, count: genres[i]})
        }
        // then sort and return genresArray;
        return genresArray.sort((a, b) => { return b.count - a.count });
    }

    printState() {
        console.log('*** FindCommon printing state ***', this.state);
    }


    render() {
        return (
            <React.Fragment>
                <div className="row center">
                    <input className="search-email center" type="text" name="searchEmail" placeholder="Your Friend's Email" value={this.state.searchEmail} onChange={this.inputHandler}  />
                    <button className="waves-effect waves-dark btn btn-submit-search center" onClick={this.search}>find common Music</button>
                </div>

                {/* <button className="waves-effect waves-dark btn" onClick={this.printState}>print state</button> */}

                <div className="row display-common">
                    <div className="col sm6 display-inline">
                        <h5 className="underline-text">common artists</h5>
                        <ol>
                            {this.state.artistsInCommon && <CommonArtists commonArtists={this.state.artistsInCommon} />}
                        </ol>
                    </div>

                    <div className="col sm6 display-inline">
                        <h5 className="underline-text">common genres</h5>
                        <ol>
                            {this.state.genresInCommon && <CommonGenres commonGenres={this.state.genresInCommon} /> }
                        </ol>
                    </div>
                </div>

            </React.Fragment>
        );
    }

}

export default FindCommon;


