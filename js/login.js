function do_login(username, password, on_success) {
    var data ={
        "username": username,
        "password": password
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        resp = JSON.parse(xhr.responseText);
        if (xhr.status == 200) {
            localStorage.authtoken = resp.token;
            on_success();
        } else {
            alert("Failed to log in");
        }
    };

    xhr.open('POST', BASE_URL + "/api-token-auth/");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

function do_logout() {
    localStorage.removeItem("authtoken");
}
