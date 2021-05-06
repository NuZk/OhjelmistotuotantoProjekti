const { response } = require("express");

function postValue() {
    document.getElementById("post_form_area").setAttribute('style', 'display:none;');
    var data = $("#postform").serialize();	
    postData(data);
    return false;
};

function postData(fdata) {
    fetch("/messages/", {
        method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},//tämä jos puuttui niin ei toiminut
        body: fdata
    })
    .then(response => response.json())
    .then(data => { 
        document.getElementById("msg_area").innerHTML = '<center><h2><br>' + data.message + '</h2></center>';
        document.getElementById("msg_area").setAttribute('style', 'display:block;');
    });
};

// JONIN JUTTUJA

function showUserDataEdit(user, op) {
    op = true
    var html = "<h2>Valitse viesti:</h2><br><table class='table table-bordered'><thead><tr><th>Tunnus</th><th>Lähettäjä</th><th>Topic</th><th>Viesti</th>" + 
            "</tr></thead><tbody>";
    fetch('/messages')
    .then(response => response.json())
    .then(data => { 
        for(var i=0; (i < data.length); i++) {
            if( data[i].sender == user) {
                html += '<tr><td >' + 
                    "<a href='javascript:" + (op ? "editMsg(" : "modMsg(") + data[i].id + ")'>" + data[i].id + '</a>' +
                    '</td><td>' + data[i].sender +
                    '</td><td>' + data[i].topic +
                    '</td><td>' + data[i].message +
                    '</td></tr>'
            }
        }
        html += "</tbody></table>";
        return html
    })
    .then(html => document.getElementById("msg_area").innerHTML = html)
    .catch(error => document.getElementById("msg_area").innerHTML = 'Error: ' + error);
    document.getElementById("msg_area").setAttribute('style', 'display:block;');
};

function editMsg(id) {
    console.log('hepEdit')
    document.getElementById("msg_area").setAttribute('style', 'display:none;');
    document.getElementById("post_form_area_edit").setAttribute('style', 'display:block;');
    document.getElementById("msgID").setAttribute('value', id)
    return false;
};

function editValue() {
    document.getElementById("post_form_area_edit").setAttribute('style', 'display:none;');
    var data = $("#postformEdit").serialize();	
    editData(data);
    return false;
};

function editData(fdata) {
    fetch("/messages/", {
        method: 'put',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},//tämä jos puuttui niin ei toiminut
        body: fdata
    })
    .then(response => response.json())
    .then(data => { 
        document.getElementById("msg_area").innerHTML = '<center><h2><br>' + data.message + '</h2></center>';
        document.getElementById("msg_area").setAttribute('style', 'display:block;');
    });
};

//^^ JONIN JUTTUJA

function postMsg() {
    console.log('hep')
    document.getElementById("msg_area").setAttribute('style', 'display:none;');
    document.getElementById("post_form_area").setAttribute('style', 'display:block;');
    return false;
};
function deleteMessage(sender){
    document.getElementById("msg_area").setAttribute('style', 'display:none;');
    document.getElementById("post_form_area").setAttribute('style', 'display:none;');
    showUserData(sender,true);
    return false;
    
};
function showUserData(user, op) {
    var html = "<h2>Valitse viesti:</h2><br><table class='table table-bordered'><thead><tr><th>Tunnus</th><th>Lähettäjä</th><th>Topic</th><th>Viesti</th>" + 
            "</tr></thead><tbody>";
    fetch('/messages')
    .then(response => response.json())
    .then(data => { 
        for(var i=0; (i < data.length); i++) {
            if( data[i].sender == user) {
                html += '<tr><td >' + 
                    "<a href='javascript:" + (op ? "deleteMessage2(" : "modMsg(") + data[i].id + ")'>" + data[i].id + '</a>' +
                    '</td><td>' + data[i].sender +
                    '</td><td>' + data[i].topic +
                    '</td><td>' + data[i].message +
                    '</td></tr>'
            }
        }
        html += "</tbody></table>";
        return html
    })
    .then(html => document.getElementById("msg_area").innerHTML = html)
    .catch(error => document.getElementById("msg_area").innerHTML = 'Error: ' + error);
    document.getElementById("msg_area").setAttribute('style', 'display:block;');
};
function deleteMessage2(id){
    var msg ='ID '+ id;
    
    fetch('/messages/'+id,{
        method: 'delete',
        body:JSON.stringify(msg)
    })
    .then(response => response.json())
    .then(data => document.getElementById("msg_area").innerHTML='<center><h2><br>'+data.message+ '</h2></center>');
    document.getElementById("msg_area").setAttribute('style','display:block');
};