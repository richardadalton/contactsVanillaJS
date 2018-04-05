function do_login(username, password, on_success) {
    var data ={
        "username": username,
        "password": password
    };

    $.ajax({
        url: BASE_URL + "/api-token-auth/",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resp, status) {
            localStorage.authtoken = resp.token;
            on_success();
        },
        error: function(){
            alert("Failed logging in");
        }
    })
}

function do_logout() {
    localStorage.removeItem("authtoken");
}
