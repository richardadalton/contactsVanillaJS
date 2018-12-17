// BASE_URL = "https://com-devjoy-contactsapi.herokuapp.com";
BASE_URL = "https://com-devjoy-contactsapi.herokuapp.com";
CONTACTS_URL = BASE_URL + "/contacts";

$("#add-contact-btn").click(function(){
    $("#create-contact-panel").slideToggle("slow");
});


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


function on_toggle_like(resp) {
    $("input[type=text], textarea").val("");
    $("#create-contact-panel").slideUp("slow");
}


function update_screen(url) {
    if(localStorage.authtoken) {
        get_contacts(url, on_receive_contacts);
    }
    update_buttons();
}

$(document).ready(function () {
    $("#contact-form").submit(function(e){
        e.preventDefault();
        create_contact($("#first_name").val(), $("#last_name").val(), $("#email").val(), on_create_contact);
    });

    $("#login-form").submit(function(e){
        e.preventDefault();
        $('#myModal').modal('hide');
        do_login($("#uname").val(), $("#pword").val(), update_screen);
    });

    update_screen(CONTACTS_URL);
});
