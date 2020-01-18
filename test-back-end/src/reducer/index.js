import {
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL
} from '../actions';

const initialState = {
    users: []
};

const rootReducer = (state = initialState, action) => {
    console.log('reducer', action);
    switch(action.type) {
        case FETCH_USERS_START:
            return {
                ...state,
                isFetching: true,
                error: ''
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                isFetching: false,
                error: ''
            }
        case FETCH_USERS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;