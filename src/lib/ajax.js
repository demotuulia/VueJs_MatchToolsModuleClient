import axios from 'axios';

function axiosPost(handler, uri, data, user, callback) {
    let urls = import.meta.env.VITE_MATCH_TOOLS_BASE_URL + uri;
    let token = 'Bearer ' + user.apiToken;
    showSpinner(handler);
    resetMessages(handler);
    axios.post(urls,
        data,
        {
            headers: {
                'Authorization': token,
                'Accept': 'application/json'
            }
        }
    )
        .then(function (response) {
            handler[callback](response);
            hideSpinner(handler);
        })
        .catch(function (error) {
            hideSpinner(handler);
            console.log(error);
        })
}

function axiosPut(handler, uri, data, user, callback) {
    let urls = import.meta.env.VITE_MATCH_TOOLS_BASE_URL + uri;
    let token = 'Bearer ' + user.apiToken;
    showSpinner(handler);
    resetMessages(handler);
    axios.put(urls,
        data,
        {
            headers: {
                'Authorization': token,
                'Accept': 'application/json'
            }
        }
    )
        .then(function (response) {
            hideSpinner(handler);
            handler[callback](response);
        })
        .catch(function (error) {
            hideSpinner(handler);
            console.log(error);
        })
}

function axiosGet(handler, uri, data, user, callback) {
    let urls = import.meta.env.VITE_MATCH_TOOLS_BASE_URL + uri;
    let config = getHeaders(handler, user);
    showSpinner(handler)

    axios.get(urls, config)
        .then(function (response) {
            hideSpinner(handler);
            handler[callback](response);
        })
        .catch(function (error) {
            hideSpinner(handler);
            handler[callback](error);
        })
}


function axiosDelete(handler, uri, id, user, callback) {
    let urls = import.meta.env.VITE_MATCH_TOOLS_BASE_URL + uri;

    let config = getHeaders(handler, user);
    let token = 'Bearer ' + user.apiToken;
    showSpinner(handler);
    resetMessages(handler);
    axios.delete(urls, config)
        .then(function (response) {
            hideSpinner(handler);
            handler[callback](response);
        })
        .catch(function (error) {
            hideSpinner(handler);
            console.log(error);
        })
}


function resetMessages(handler) {
    handler.appProps.messages = {
        messages: {},
        type: ''
    };
}

function showSpinner(handler) {
    handler.appProps.showAjaxSpinner = 1;
}

function hideSpinner(handler) {
    handler.appProps.showAjaxSpinner = 0;
}

function getHeaders(handler, user) {
    let token = 'Bearer ' + user.apiToken;
    let config = {
        headers: {
            'Authorization': token,
            'Accept': 'application/json'
        }
    }
    return config;
}

export {axiosPost, axiosGet, axiosPut, axiosDelete}