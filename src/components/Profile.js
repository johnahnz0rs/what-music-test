import React from 'react';
import Artist from './Artist';
import Genre from './Genre';

class Profile extends React.Component  {

    constructor(props) {
        super(props)
        this.state = {
            user: props.profile,
            showTopArtists: false,
            showTopGenres: false
        }
        this.showArtists = this.showArtists.bind(this);
        this.showGenres = this.showGenres.bind(this);
        // this.getMyTopGenres = this.getMyTopGenres.bind(this);
        this.printState = this.printState.bind(this);
    }


    showArtists() {
        // showTopArtists = true;
        // showTopGenres = false;
        this.setState({showTopArtists: true});
        this.setState({showTopGenres: false});
    }

    showGenres() {
        // if (this.state.users.favGenres.length === 0) {
        //     this.getMyTopGenres();
        // }
        // console.log(showTopGenres);
        // showTopGenres = true;
        // showTopArtists = false;
        this.setState({showTopGenres: true});
        this.setState({showTopArtists: false});
    }

    printState() {
        console.log('*** Profile printing state ***', this.state);
    }


    render() {
        return(
            <React.Fragment>
                <div className="row center">
                    <h4 className="underline-text">Your Top Picks</h4>
                </div>
                <div className="row center">
                    <div className="col s4">
                        <button className="waves-effect waves-dark btn btn-artist-genre-song center" onClick={this.showArtists}>By Artist</button>
                    </div>
                    <div className="col s4">
                        <button className="waves-effect waves-dark btn btn-artist-genre-song" onClick={this.showGenres}>By Genre</button>
                    </div>
                    <div className="col s4">
                        <button className="waves-effect waves-dark btn btn-artist-genre-song disabled" onClick={this.showSongs}>By Song</button>
                        {/* <button className="waves-effect waves-dark btn" onClick={this.printState}>print state</button> */}
                    </div>
                </div>



                <div className="row show-artist-genre-song center">
                    {this.state.showTopArtists && <Artist favArtists={this.state.user.favArtists} />}
                    {this.state.showTopGenres && <Genre favGenres={this.state.user.favGenres} />}
                </div>
            </React.Fragment>
        );
    }
}

export default Profile;
