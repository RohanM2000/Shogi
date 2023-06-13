import csrfFetch from "./csrf";

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';


export const setUser = (payload) => {
    return {
        type: SET_USER,
        payload
    }
};

export const removeUser = () => {
    return {
        type: REMOVE_USER
    }
};

export const loginUser = (credential, password) => {
    return async (dispatch)=> {
        const response = await csrfFetch('/api/session', {
            method: "POST",
            body: JSON.stringify({credential, password})
        })

        if (response.ok) {
            const user = await response.json();

            dispatch(setUser(user['user']));
        }

        return response;
    }
};



const sessionReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_USER:
            let newState = {user: action.payload};
            return newState;
        case REMOVE_USER:
            let nextState = {user: null};
            return nextState;
        default:
            return state;
    }
};

export default sessionReducer;