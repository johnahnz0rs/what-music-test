import React from 'react';
import logo from '../logo.png';


const Login = props => {
    return (
        <React.Fragment>
            <div className="container">
                <div className="row center-align">
                    {/*<h4>What Music</h4>*/}
                    {/*<p>You want to get to know someone better through their taste in music. But when you ask "whatMusic do you listen to?", you get a wack answer like "I listen to everything".</p>*/}
                    {/*<p>Quit stuttering and use #HARDdata to find out if you belong together.</p>*/}

                    <img src={logo} alt="logo" className="logo"/>
                    <p className="blurb">Sharing music is a time-revered method of connecting with friends, old and new. But too often, we have trouble describing our music tastes.</p>
                    <p className="blurb">We got your back. whatMusic eliminates the vague and stuttering answers by SHOWING you whatMusic you have in common.</p>
                    <p className="blurb bold-text">Rock on, my friends.
                        <br /><span className="blue-text">*Best viewed on a smartphone*</span>
                    </p>
                </div>
                <div className="row">
                    <div className="center-align">
                        <button
                            className="btn waves-effect waves-light"
                            type="submit"
                            name="action"
                            onClick={() => (window.location = '/login')}
                        >
                            Sign in with Spotify
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;
