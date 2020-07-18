import {LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS, REGISTER_USER_ERROR} from "../actions/usersAction";

const initialState = {
    user: null,
    loginError: null,
    registerError: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, loginError: null};
        case LOGIN_USER_ERROR:
            return {...state, loginError: action.error};
        case LOGOUT_USER_SUCCESS:
            return {...state, user: null};
        case REGISTER_USER_ERROR:
            return {...state, registerError: action.error};
        default:
            return state;
    }
};

export default usersReducer;