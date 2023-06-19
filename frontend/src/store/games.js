import csrfFetch from "./csrf";
const RECEIVE_GAME = "games/RECEIVE_GAME";

export const receiveGame = (game) => {
    return {
        type: RECEIVE_GAME,
        game
    };
};

export const fetchGame = (gameId) => {
    return async (dispatch) => {
        const response = await csrfFetch(`/api/games/${gameId}`);

        if (response.ok) {
            const game = await response.json();

            dispatch(receiveGame(game));
        }

        return response;
    };
};

export const updateGame = ({gameId, move}) => {
    // console.log(gameId, move)
    return async (dispatch) => {
        const response = await csrfFetch(`/api/games/${gameId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({move})
        });

        if (response.ok) {
            const newGame = await response.json();

            dispatch(receiveGame(newGame));
        }

        return response;
    };
};

export const createGame = (game) => {
    return async (dispatch) => {
        const response = await csrfFetch('/api/games', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(game)
        });

        if (response.ok) {
            const newGame = await response.json();

            dispatch(receiveGame(newGame));
        }

        return response;
    };
};

export default function gamesReducer (prevState = {}, action) {
    let newState;
    switch(action.type) {
        case RECEIVE_GAME:
            newState = {...prevState, [action.game.id]: action.game};
            return newState;
        default:
            return prevState;
    }
};