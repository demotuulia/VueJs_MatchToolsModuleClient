function userLogin(handler, response) {
    handler.$cookies.set("apiToken", response.data.data.token);
    handler.$cookies.set("name", response.data.data.name);
    handler.$cookies.set("company", response.data.data.company);
    handler.$cookies.set("role", response.data.data.role);
    handler.$cookies.set("userId", response.data.data.id);
}


function userLogout(handler, response) {
    handler.$cookies.remove("apiToken");
    handler.$cookies.remove("name");
    handler.$cookies.remove("company");
    handler.$cookies.remove("role");
    handler.$cookies.remove("userId");
}

function userGet(handler) {

    return {
        'apiToken': handler.$cookies.get("apiToken"),
        'name': handler.$cookies.get("name"),
        'company': handler.$cookies.get("company"),
        'role': handler.$cookies.get("role"),
        'id': handler.$cookies.get("userId"),
    }
}

export {userLogin, userLogout, userGet}