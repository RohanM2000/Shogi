import csrfFetch from "./csrf";
const RECEIVE_USER_GAMES = 'userGames/RECEIVE_USER_GAMES';


export const receiveUserGames = (games) => {
    return {
        type: RECEIVE_USER_GAMES,
        games
    };
};

export const getUserGames = userId => {
    return state => {
        if (!state) return [];
        if (!state.userGames) return [];
        return Object.values(state.userGames)
            .filter(game => game.white_id === parseInt(userId) || game.black_id === parseInt(userId))
                 .sort((gameA, gameB) => {
                    return Math.sign(new Date(gameA.createdAt).getTime() - new Date(gameB.createdAt).getTime());
                 });
    };
};

export const fetchUserGames = userId => {
    return async (dispatch) => {
        const response = await csrfFetch(`/api/games?userId=${userId}`);

        if (response.ok) {
            const games = await response.json();

            dispatch(receiveUserGames(games));
        }

        return response;
    };
};


export default function userGamesReducer (prevState = {}, action) {
    let nextState;
    switch(action.type) {
        case RECEIVE_USER_GAMES:
            nextState = {...prevState};
            action.games.forEach(game=> nextState[game.id] = game);
            return nextState;
        default:
            return prevState;
    }
};