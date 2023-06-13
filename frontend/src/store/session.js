import csrfFetch, { storeCSRFToken, storeCurrentUser } from "./csrf";

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

export const loginUser = ({credential, password}) => {
    return async (dispatch)=> {
        const response = await csrfFetch('/api/session', {
            method: "POST",
            body: JSON.stringify({credential, password})
        })

        if (response.ok) {
            const user = await response.json();
            storeCurrentUser(user.user);
            dispatch(setUser(user['user']));
        }

        return response;
    }
};

export const logoutUser = () => {
    return async (dispatch)=> {
        const response = await csrfFetch('/api/session', {
            method: "DELETE"
        });
        storeCurrentUser(null);
        dispatch(removeUser());

        return response;
        // sessionStorage.remove("currentUser");
    }
}

export const createUser = ({username, email, password}) => {
    return async (dispatch)=> {
        const response = await csrfFetch('/api/users', {
            method: "POST",
            body: JSON.stringify({email, username, password})
        })

        if (response.ok) {
            const user = await response.json();
            storeCurrentUser(user.user);
            dispatch(setUser(user['user']));
        }

        return response;
    }
};


export const restoreSession = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setUser(data.user));
    return response;
};


const sessionReducer = (state = {}, action) => {
    const initialState = {user: JSON.parse(sessionStorage.getItem("currentUser"))};
    switch(action.type) {
        case SET_USER:
            let newState = {...initialState, user: action.payload};
            return newState;
        case REMOVE_USER:
            let nextState = {...initialState, user: null};
            return nextState;
        default:
            return initialState;
    }
};

export default sessionReducer;