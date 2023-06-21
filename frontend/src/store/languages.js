export function swapLanguage(dispatch) {
    if (sessionStorage.getItem("lang") === "en") {
        sessionStorage.setItem("lang", "jp");
    } else {
        sessionStorage.setItem("lang", "en");
    }
    dispatch(receiveLanguage(sessionStorage.getItem("lang")));
};

const RECEIVE_LANGUAGE = "languages/RECEIVE_LANGUAGE";


export function receiveLanguage (lang) {
    return {
        type: RECEIVE_LANGUAGE,
        lang
    };
};

export default function languagesReducer (prevState = {}, action) {
    switch(action.type) {
        case RECEIVE_LANGUAGE:
            return { "lang": action.lang };
        default:
            return prevState;
    }
};