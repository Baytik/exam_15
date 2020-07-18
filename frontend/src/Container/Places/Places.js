import React, {Component} from 'react';
import './Places.css';
import {connect} from "react-redux";
import {deletePlace, getPlaces} from "../../store/actions/placesAction";
import {apiURL} from "../../apiURL";

class Places extends Component {

    componentDidMount() {
        this.props.getPlaces()
    }

    clickHandler = (id) => {
      this.props.history.push(`/place/${id}`)
    };

    deleteRecipeHandler = async (id) => {
        await this.props.deletePlace(id)
    };

    render() {
        return (
            <div className="Recipes">
                {this.props.places && this.props.places.map(place => (
                    <div key={place._id} className="Recipe">
                        <img src={apiURL + '/uploads/' + place.image} alt={place._id}/>
                        <p className="title" onClick={() => this.clickHandler(place._id)}>{place.title}</p>
                        <p>(Rate: {!place.rating ? 0 : place.rating}, Views: {place.views})</p>
                        {this.props.user && this.props.user.role === 'admin' && (
                            <button className="delete-button" onClick={() => this.deleteRecipeHandler(place._id)}>Delete</button>
                        )}
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    places: state.places.places,
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    getPlaces: () => dispatch(getPlaces()),
    deletePlace: (id) => dispatch(deletePlace(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Places);