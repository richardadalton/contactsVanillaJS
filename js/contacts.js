BASE_URL = "https://com-devjoy-contactsapi.herokuapp.com";
CONTACTS_URL = BASE_URL + "/contacts_all/";

function get_contacts(on_success) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        on_receive_contacts(xhr.responseText);
    };

    xhr.open('GET', CONTACTS_URL);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("Authorization", "Token " + localStorage.authtoken);
    xhr.send();
}


function delete_contact(url, on_success) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        on_contact_deleted();
    };

    xhr.open('DELETE', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("Authorization", "Token " + localStorage.authtoken);
    xhr.send();
}


function create_contact(first_name, last_name, email, on_success) {
    var data ={
        "first_name": first_name,
        "last_name": last_name,
        "email": email
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      on_create_contact(xhr.responseText);
    };

    xhr.open('POST', BASE_URL + "/contacts/");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("Authorization", "Token " + localStorage.authtoken);
    xhr.send(JSON.stringify(data));
}

