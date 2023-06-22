const csrfFetch = async (url, options = {}) => {
    options.headers ||= {};

    options.method ||= "GET";
    if (options.method.toUpperCase() !== "GET") {
        if (!options.headers["Content-Type"] && !(options.body instanceof FormData)) {
            options.headers["Content-Type"] = "application/json";
        }
        // options.headers['Content-Type'] ||= "application/json";
        options.headers['X-CSRF-Token'] = sessionStorage.getItem("X-CSRF-Token");
    }

    const res = await fetch(url, options);

    if (res.status >= 400) throw res;

    return res;
};  

export const storeCSRFToken = (response) => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
};

export const restoreCSRF = async () => {
    const res = await csrfFetch('/api/session');
    storeCSRFToken(res);
    return res;
};

export const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
};


export default csrfFetch;