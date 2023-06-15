import csrfFetch from "./csrf";
import { receiveMessages } from "./messages.js"

const RECEIVE_ROOM = "rooms/RECEIVE_ROOM";

export const receiveRoom = (room) => {
    return {
        type: RECEIVE_ROOM,
        room
    };
};

export const createRoom = (room) => {
    return async (dispatch) => {
        const response = await csrfFetch('/api/rooms', {
            method: "POST",
            body: JSON.stringify(room)
        });
        if (response.ok) {
            const room = await response.json();
            dispatch(receiveRoom(room.room));
            dispatch(receiveMessages(room.messages));
        }
        return response;
    };
};

export const fetchRoom = (roomId) => {
    return async (dispatch) => {
        const response = await csrfFetch(`/api/rooms/${roomId}`);
        if (response.ok) {
            const room = await response.json();
            dispatch(receiveRoom(room.room));
            dispatch(receiveMessages(room.messages));
        };
        return response;
    };
};

const roomsReducer = (prevState = {}, action) => {
    let newState;
    switch(action.type) {
        case RECEIVE_ROOM:
            newState = {...prevState, [action['room']['id']]: action['room']};
            return newState;
        default:
            return prevState;
    };
};

export default roomsReducer;