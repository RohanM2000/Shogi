const RECEIVE_MODAL = 'modals/RECEIVE_MODAL';
const REMOVE_MODAL = 'modals/REMOVE_MODAL';


export function receiveModal(modalName) {
    return {
        type: RECEIVE_MODAL,
        payload: {
            [modalName]: true
        }
    };
};

export function removeModal() {
    return {
        type: REMOVE_MODAL
    };
};

export function getModal(modalName) {
    return (state) => {
        if (!state || !state.modals) return null;
        return state.modals[modalName];
    };
};

export default function modalsReducer (prevState = {}, action) {
    let newState;
    switch(action.type) {
        case RECEIVE_MODAL:
            newState = {...action.payload};
            return newState;
        case REMOVE_MODAL:
            return {};
        default:
            return prevState;
    }
};