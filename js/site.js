// BASE_URL = "https://com-devjoy-contactsapi.herokuapp.com";
BASE_URL = "https://com-devjoy-contactsapi.herokuapp.com";
CONTACTS_URL = BASE_URL + "/contacts";



// Button Click Handlers
function add_contact_click() {
    $("#create-contact-panel").slideToggle("slow");
}


function delete_contact_click(url) {
    $('#deleteModal').modal('hide');
    delete_contact(url, on_contact_deleted);
}


function move_previous_click() {
    var url = document.getElementById('previous-btn').getAttribute("data-href");
    update_screen(url);
}


function move_next_click() {
    var url = document.getElementById('next-btn').getAttribute("data-href");
    update_screen(url);
}



// Callbacks
function on_logout() {
    do_logout();
    update_buttons();
}


function on_contact_deleted() {
    update_screen(CONTACTS_URL);
}


function on_receive_contacts(data) {
    next_url = data['next'];
    document.getElementById('next-btn').setAttribute('data-href', next_url);

    previous_url = data['previous'];
    document.getElementById('previous-btn').setAttribute('data-href', previous_url);

    $("#contacts-list").empty();
    $("#contactTemplate").tmpl(data.results).appendTo("#contacts-list");

}




// Screen Update Methods
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


function update_screen(url) {
    if(localStorage.authtoken) {
        get_contacts(url, on_receive_contacts);
    }
    update_buttons();
}


// Wire up html elements
$(document).ready(function () {
    $("#login-form").submit(function(e){
        e.preventDefault();
        $('#loginModal').modal('hide');
        do_login($("#uname").val(), $("#pword").val(), update_screen);
    });


    $("#contact-form").submit(function(e){
        e.preventDefault();
        create_contact($("#first_name").val(), $("#last_name").val(), $("#email").val(), on_create_contact);
    });


    $('#deleteModal').on('show.bs.modal', function(e) {
        var url = "javascript:delete_contact_click('" + $(e.relatedTarget).data('href') + "')";
        $(this).find('#btn-delete').attr('href', url);
    });

    update_screen(CONTACTS_URL);
});
