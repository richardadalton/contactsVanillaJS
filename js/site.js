// BASE_URL = "https://com-devjoy-contactsapi.herokuapp.com";
BASE_URL = "https://com-devjoy-contactsapi.herokuapp.com";
CONTACTS_URL = BASE_URL + "/contacts";


function move_previous() {
    var url = document.getElementById('previous-btn').getAttribute("data-href");
    update_screen(url);
}

function move_next() {
    var url = document.getElementById('next-btn').getAttribute("data-href");
    update_screen(url);
}

function on_logout() {
    do_logout();
    update_buttons();
}

function update_buttons() {
    if(localStorage.authtoken) {
        $("#login-link").hide();
        $("#logout-link").show();
        $("#content-area").show();
    } else {
        $("#login-link").show();
        $("#logout-link").hide();
        $("#content-area").hide();
    }
}


function on_receive_contacts(data) {
    next_url = data['next'];
    document.getElementById('next-btn').setAttribute('data-href', next_url);

    previous_url = data['previous'];
    document.getElementById('previous-btn').setAttribute('data-href', previous_url);

    $("#contacts-list").empty();
    $("#contactTemplate").tmpl(data.results).appendTo("#contacts-list");

}

function on_create_contact(contact) {
    // Append a contact list item to the contacts list
    $("#contacts").append($("<li>").text(contact.first_name + " " + contact.last_name + " (" + contact.email + ")"));
}





function update_screen(url) {
    if(localStorage.authtoken) {
        get_contacts(url, on_receive_contacts);
    }
    update_buttons();
}

$(document).ready(function () {
    $("#login-form").submit(function(e){
        e.preventDefault();
        $('#myModal').modal('hide');
        do_login($("#uname").val(), $("#pword").val(), update_screen);
    });

    update_screen(CONTACTS_URL);
});
