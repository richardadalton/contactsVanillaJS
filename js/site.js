function show(elem) {
    elem.style.display = 'block';
}


function hide(elem) {
    elem.style.display = 'none';
}


function toggle(elem) {
    // If the element is visible, hide it
    if (window.getComputedStyle(elem).display === 'block') {
        hide(elem);
        return;
    }
    // Otherwise, show it
    show(elem);
}


// Button Click Handlers
function add_contact_click() {
    toggle(document.getElementById('create-contact-panel'));
}


function delete_contact_click(url) {
    $('#deleteModal').modal('hide');
    delete_contact(url, on_contact_deleted);
}



// Callbacks
function on_logout() {
    do_logout();
    update_screen();
}


function on_contact_deleted() {
    update_screen();
}


function on_receive_contacts(data) {
    data = JSON.parse(data);

    json = { 'contacts': data };
    var list = document.getElementById('contacts-list');
    while(list.firstChild) list.removeChild(list.firstChild);

    var tmpl = document.getElementById('contactTemplate').innerHTML;
    html = Mustache.to_html(tmpl, json);

    document.getElementById('contacts-list').innerHTML = html;
}

function on_create_contact(data) {
    toggle(document.getElementById('create-contact-panel'));
}


// Screen Update Methods
function update_buttons() {
    if(localStorage.authtoken) {
        hide(document.getElementById('login-link'));
        show(document.getElementById('logout-link'));
        show(document.getElementById('content-area'));
    } else {
        show(document.getElementById('login-link'));
        hide(document.getElementById('logout-link'));
        hide(document.getElementById('content-area'));
    }
}


function update_screen() {
    if(localStorage.authtoken) {
        get_contacts(on_receive_contacts);
    }
    update_buttons();
}


// Wire up html elements
document.addEventListener("DOMContentLoaded", function() {

    var login_form = document.getElementById("login-form");
    login_form.addEventListener("submit", function(e){
        e.preventDefault();
        username = document.getElementById('uname').value;
        password = document.getElementById('pword').value;
        do_login(username, password, update_screen);
    });


    var contact_form = document.getElementById("contact-form");
    contact_form.addEventListener("submit", function(e){
        e.preventDefault();
        first_name = document.getElementById('first_name').value;
        last_name = document.getElementById('last_name').value;
        email = document.getElementById('email').value;
        create_contact(first_name, last_name, email, on_create_contact);
    });


    $('#deleteModal').on('show.bs.modal', function(e) {
        var url = "javascript:delete_contact_click('" + $(e.relatedTarget).data('href') + "')";
        $(this).find('#btn-delete').attr('href', url);
    });

    update_screen();

});

