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
    m = document.getElementById("deleteModal");

    var deleteModalOptions= {
        title: 'Confirm Delete',
        content: 'You sure about this?',
    };

// set a custom modal-content template
    var deleteModalContent =
        '<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
        +'<span aria-hidden="true">×</span>'
        +'</button>'
        +'<h4 class="modal-title" id="gridModalLabel">' + deleteModalOptions.title + '</h4>'
        +'</div>'
        +'<div class="modal-body">'
        +'<p>' + deleteModalOptions.content + '</p>'
        +'</div>'
        +'<div class="modal-footer">'
        +'<button type="button" class="btn btn-default" onclick="confirm_delete_click(' + "'" + url + "'" + ')">Yes Do It!</button>'
        +'</div>';

    var myModalInstance = new Modal(m, {
        content: deleteModalContent
    });
    myModalInstance.show();

    // $('#deleteModal').modal('hide');
    // delete_contact(url, on_contact_deleted);
}


function confirm_delete_click(url) {
    delete_contact(url, on_contact_deleted);
}



// Callbacks
function on_logout() {
    do_logout();
    update_screen();
}


function on_contact_deleted() {
    m = document.getElementById("deleteModal");
    var myModalInstance = new Modal(m);
    myModalInstance.hide();

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

function on_login() {
    new Modal(document.getElementById("loginModal")).hide();
    update_screen();
}


// Wire up html elements
document.addEventListener("DOMContentLoaded", function() {

    var login_form = document.getElementById("login-form");
    login_form.addEventListener("submit", function(e){
        e.preventDefault();
        username = document.getElementById('uname').value;
        password = document.getElementById('pword').value;
        do_login(username, password, on_login);
    });


    var contact_form = document.getElementById("contact-form");
    contact_form.addEventListener("submit", function(e){
        e.preventDefault();
        first_name = document.getElementById('first_name').value;
        last_name = document.getElementById('last_name').value;
        email = document.getElementById('email').value;
        create_contact(first_name, last_name, email, on_create_contact);
    });


    myModal = document.getElementById("deleteModal");

    // myModal.addEventListener('show.bs.modal', function(event){
    //     var url = "javascript:delete_contact_click('" + $(e.relatedTarget).data('href') + "')";
    //     $(this).find('#btn-delete').attr('href', url);
    // }, false);

    update_screen();
});

