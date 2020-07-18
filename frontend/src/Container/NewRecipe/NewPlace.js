import React, {Component} from 'react';
import './NewPlace.css';
import {createPlace} from "../../store/actions/placesAction";
import {connect} from "react-redux";

class NewPlace extends Component {

    state = {
        title: '',
        image: null,
        description: '',
        checked: false
    };

    changeInputHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    fileChangeHandler = e => {
        this.setState({[e.target.name]: e.target.files[0]})
    };

    checkboxChangeHandler = (event) => {
        const target = event.target;
        const value = target.name === 'checked' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    createNewPlace = async (event) => {
        if (this.state.checked === false) {
            alert('You did not accept the agreement')
        } else {
            event.preventDefault();
            const newPlace = new FormData();
            newPlace.append('title', this.state.title);
            newPlace.append('image', this.state.image);
            newPlace.append('description', this.state.description);
            newPlace.append('check', this.state.checked);
            await this.props.createPlace(newPlace);
        }
    };

    render() {
        return (
            <div className="new-recipe">
                <h1>Add new place</h1>
                <form onSubmit={this.createNewPlace}>
                    <div>
                        <span>Title</span>
                        <input type="text" className="title-input" name="title" onChange={this.changeInputHandler} id="title"/>
                    </div>
                    <div>
                        <span>Description</span>
                        <textarea name="description" cols="61" rows="10" onChange={this.changeInputHandler}
                                  className="description-input" id="description"/>
                    </div>
                    <div>
                        <span>Image</span>
                        <input type="file" className="image-input" name="image" onChange={this.fileChangeHandler}/>
                    </div>
                    <div className="agree-block">
                        <span>
                            By submitting this form, you agree that the following information will be submitted to the
                            public domain, and administrators of the site will have full control over the said
                            information.
                        </span>
                        <input name="checked" type="checkbox" onChange={this.checkboxChangeHandler} id="check"/>
                        <span>I understand</span>
                    </div>
                    <div>
                        <button type="submit" id="add_place">Submit new place</button>
                    </div>
                    <div>
                        {this.props.placeError && (
                            <h5 className="error">{this.props.placeError}</h5>
                        )}
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    placeError: state.places.placeError
});

const mapDispatchToProps = dispatch => ({
    createPlace: (place) => dispatch(createPlace(place))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPlace);