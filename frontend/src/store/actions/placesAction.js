import axiosAPI from "../../axiosAPI";
import {push} from "connected-react-router";

export const GET_PLACE_SUCCESS = 'GET_PLACE_SUCCESS';
export const GET_PLACE_ERROR = 'GET_PLACE_ERROR';

export const FETCH_PLACE_SUCCESS = 'FETCH_PLACE_SUCCESS';
export const FETCH_PLACE_ERROR = 'FETCH_PLACE_ERROR';

export const CREATE_NEW_PLACE_ERROR = 'CREATE_NEW_PLACE_ERROR';

export const CREATE_IMAGE_SUCCESS = 'CREATE_IMAGE_SUCCESS';
export const CREATE_IMAGE_ERROR = 'CREATE_IMAGE_ERROR';

export const ADD_MESSAGE_ERROR = 'ADD_MESSAGE_ERROR';

export const DELETE_PLACE_ERROR = 'DELETE_RECIPE_ERROR';

export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

export const DELETE_IMAGE_ERROR = 'DELETE_IMAGE_ERROR';

export const getPlaceSuccess = (places) => ({type: GET_PLACE_SUCCESS, places});
export const getPlaceError = (error) => ({type: GET_PLACE_ERROR, error});

export const fetchPlaceSuccess = (place) => ({type: FETCH_PLACE_SUCCESS, place});
export const fetchPlaceError = (error) => ({type: FETCH_PLACE_ERROR, error});

export const createNewPlaceError = (error) => ({type: CREATE_NEW_PLACE_ERROR, error});

export const createImageSuccess = (data) => ({type: CREATE_IMAGE_SUCCESS, data});
export const createImageError = (error) => ({type: CREATE_IMAGE_ERROR, error});

export const addMessageError = (error) => ({type: ADD_MESSAGE_ERROR, error});

export const deletePlaceError = (error) => ({type: DELETE_PLACE_ERROR, error});

export const deleteCommentError = (error) => ({type: DELETE_COMMENT_ERROR, error});

export const deleteImageError = (error) => ({type: DELETE_IMAGE_ERROR, error});

export const getPlaces = () => {
    return async (dispatch) => {
        try {
            const response = await axiosAPI.get('/places');
            dispatch(getPlaceSuccess(response.data))
        } catch (error) {
            dispatch(getPlaceError(error))
        }
    }
};

export const fetchPlace = (id) => {
    return async (dispatch) => {
        try {
            const response = await axiosAPI.get(`/places/${id}`);
            dispatch(fetchPlaceSuccess(response.data))
        } catch (error) {
            dispatch(fetchPlaceError(error))
        }
    }
};

export const createPlace = (place) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user;
            const response = await axiosAPI.post('/places', place, {headers: {'Authorization': token.token}});
            if (response.data) {
                dispatch(push(`/place/${response.data._id}`));
            }
        } catch (error) {
            dispatch(createNewPlaceError(error.response.data))
        }
    }
};

export const createImages = (data) => {
  return async (dispatch, getState) => {
      try {
          const token = getState().user.user;
          const response = await axiosAPI.post('/places/image', data, {headers: {'Authorization': token.token}});
          dispatch(createImageSuccess(response.data))
      } catch (error) {
          dispatch(createImageError(error))
      }
  }
};

export const addMessage = (comment, id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user;
            await axiosAPI.post('/places/comment', {comment, id}, {headers: {'Authorization': token.token}});
            dispatch(fetchPlace(id))
        } catch (error) {
            dispatch(addMessageError(error))
        }
    }
};

export const deletePlace = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user;
            await axiosAPI.delete(`/places/${id}`,  {headers: {'Authorization': token.token}});
            dispatch(getPlaces())
        } catch (error) {
            dispatch(deletePlaceError(error))
        }
    }
};

export const deleteComment = (id, commentId) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user;
            await axiosAPI.delete(`/places/comment/${id}/rate/${commentId}`,  {headers: {'Authorization': token.token}});
            dispatch(fetchPlace(id))
        } catch (error) {
            dispatch(deleteCommentError(error))
        }
    }
};

export const deleteImage = (id, image) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user;
            const response = await axiosAPI.delete(`/places/place/${id}/image/${image}`,  {headers: {'Authorization': token.token}});
            dispatch(createImageSuccess(response.data))
        } catch (error) {
            dispatch(deleteImageError(error))
        }
    }
};

