import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Header from "./Components/Header/Header";
import Register from "./Container/Register/Register";
import Login from "./Container/Login/Login";
import NewPlace from "./Container/NewRecipe/NewPlace";
import Places from "./Container/Places/Places";
import Place from "./Container/Place/Place";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route path="/" exact component={Places}/>
                    <Route path="/place/:id" component={Place}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/new_place" component={NewPlace}/>
                </Switch>
            </div>
        )
    }
}

export default App;