import React from 'react';

const Navbar = props => {
    return (
        <React.Fragment>
            <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo">
                        whatMusic
                    </a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <a href="#">My Profile</a>
                        </li>
                        <li>
                            <a href="#">Compare Music</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li>
                    <a href="#">My Profile</a>
                </li>
                <li>
                    <a href="#">Compare Music</a>
                </li>
            </ul>
        </React.Fragment>
    );
};

export default Navbar;
