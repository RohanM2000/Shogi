import csrfFetch from "./csrf";
const RECEIVE_USER = "users/RECEIVE_USER";
const RECEIVE_USERS = "users/RECEIVE_USERS";

const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    };
};

const receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users
    };
};

export const fetchUser = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`);

    if (response.ok) {
        const user = await response.json();
        dispatch(receiveUser(user.user));
    }
    return response;
};

export const fetchUsers = () => async (dispatch) => {
    const response = await csrfFetch('/api/users');
    
    if (response.ok) {
        const users = await response.json();
        dispatch(receiveUsers(users.users));
    }

    return response;
}

export default function usersReducer (prevState = {}, action) {
    let newState;
    switch (action.type) {
        case RECEIVE_USER:
            newState = { ...prevState, [action.user.id]: action.user};
            return newState;
        case RECEIVE_USERS:
            newState = { ...prevState};
            action.users.forEach((user)=> newState[user.id] = user);
            return newState;
        default:
            return prevState;
            break;
    }
};
