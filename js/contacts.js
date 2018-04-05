// Hit the Rest API, get a list of contacts, and append each one to the UL
function get_contacts(url, on_success) {
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Token " + localStorage.authtoken
        },
        success: on_success
    });
}