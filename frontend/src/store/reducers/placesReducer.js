import {
    CREATE_IMAGE_SUCCESS, CREATE_NEW_PLACE_ERROR, FETCH_PLACE_SUCCESS, GET_PLACE_SUCCESS,
} from "../actions/placesAction";


const initialState = {
    places: [],
    placeError: null,
    place: []
};

const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PLACE_SUCCESS:
            return {...state, places: action.places};
        case FETCH_PLACE_SUCCESS:
            return {...state, place: action.place};
        case CREATE_NEW_PLACE_ERROR:
            return {...state, placeError: action.error};
        case CREATE_IMAGE_SUCCESS:
            return {...state, place: action.data};
        default:
            return state;
    }
};

export default placesReducer;