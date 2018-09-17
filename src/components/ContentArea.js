import React from 'react';
import { Route } from 'react-router-dom';
import User from './User';
import Login from './Login';
import Navbar from './Navbar';



const ContentArea = props => {

    return (
        <React.Fragment>
            <Navbar />
            <Route exact path="/" component={Login} />
            <Route path="/user" component={User} />
        </React.Fragment>
    );
};

export default ContentArea;
