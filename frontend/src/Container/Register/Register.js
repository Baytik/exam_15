import React, {Component} from 'react';
import './Register.css';
import {connect} from "react-redux";
import {postRegister} from "../../store/actions/usersAction";
import {Redirect} from "react-router-dom";

class Register extends Component {

    state = {
        username: '',
        password: ''
    };

    changeInputHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    newUser = async (event) => {
        event.preventDefault();
        const User = {
            username: this.state.username,
            password: this.state.password
        };
        await this.props.postRegister(User);
    };

    render() {
        if (this.props.user) return <Redirect to="/"/>;
        return (
            <div className="register">
                <p>Register</p>
                <form onSubmit={this.newUser}>
                    <div>
                        <input type="text" placeholder="Write email" name="username"
                               onChange={this.changeInputHandler}/>
                    </div>
                    <div>
                        <input type="text" placeholder="Write password" name="password"
                               onChange={this.changeInputHandler}/>
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                    <div>
                        {this.props.registerError && (
                            <h5 className="error">{this.props.registerError}</h5>
                        )}
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    registerError: state.user.registerError
});

const mapDispatchToProps = dispatch => ({
    postRegister: (user) => dispatch(postRegister(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);