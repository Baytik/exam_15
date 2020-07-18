import React, {Component} from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "../../store/actions/usersAction";

class Header extends Component {

    logoOutUserHandler = () => {
        this.props.logoutUser();
    };

    render() {
        return (
            <header className="header">
                <div className="logo">
                    <NavLink to="/">Cafe Critic</NavLink>
                </div>
                <nav className="main-nav">
                    <ul>
                        {this.props.user ? (
                            <>
                                <span>Hello, {this.props.user.username}!</span>
                                <li>
                                    <NavLink to="/new_place">Add new place</NavLink>
                                </li>
                                <li>
                                    <p>or</p>
                                </li>
                                <li>
                                    <button onClick={() => this.logoOutUserHandler()}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                                <li>
                                    <p>or</p>
                                </li>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    logoutUser: (user) => dispatch(logoutUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);