import csrfFetch from "./csrf";
// import {createSelector} from "react";
const RECEIVE_MESSAGES = 'messages/RECEIVE_MESSAGES';
const RECEIVE_MESSAGE = 'messages/RECEIVE_MESSAGE';


export const receiveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        message
    };
};

export const receiveMessages = (messages) => {
    return {
        type: RECEIVE_MESSAGES,
        messages
    };
};

export const createMessage = (message) => {
    return async (dispatch) => {
        const response = await csrfFetch('/api/messages', {
            method: "POST",
            body: JSON.stringify(message)
        });
        if (response.ok) {
            const madeMessage = await response.json();   
            dispatch(receiveMessage(madeMessage));
        }
        return response;
    };
};

export const getMessages = (roomId) => (state) => {
    return Object.values(state.messages)
                 .filter(message => message.roomId === parseInt(roomId))
                 .sort((messageA, messageB) => {
                    return Math.sign(new Date(messageA.createdAt).getTime() - new Date(messageB.createdAt).getTime());
                 });
};

// export const getMessages = (roomId) => {
//     return createSelector((state)=> Object.values(state.messages), (messages) => messages.filter(message => message.roomId === parseInt(roomId))
//     .sort((messageA, messageB) => {
//        return Math.sign(new Date(messageA.createdAt).getTime() - new Date(messageB.createdAt).getTime());
//     }));
// }

const messagesReducer = (prevState = {}, action) => {
    let newState;
    switch(action.type) {
        case RECEIVE_MESSAGE:
            newState = {...prevState, [action['message']['id']]: action['message']};
            return newState;
        case RECEIVE_MESSAGES:
            newState = {...prevState};
            action.messages.forEach((message)=>newState[message.id] = message);
            return newState;
        default:
            return prevState;
    };
};

export default messagesReducer;