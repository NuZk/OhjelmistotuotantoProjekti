var mariadb = require('mariadb/callback');
var bcrypt = require('bcrypt');
var hostname = "maria.westeurope.cloudapp.azure.com";
var msgDb = 'LTD7008';
var dbUser = "opiskelija";
var dbPasswd = "opiskelija1";

module.exports = {

    // Viestien haku tietokannasta
    findMessages: function (callback) {
        var con = mariadb.createConnection({
            host: hostname,
            user: dbUser,
            password: dbPasswd,
            database: msgDb
        });

        con.connect(err => {
            if (err) return callback(null);
            con.query("SELECT * FROM messages", (err, data) => {
                if (err) return callback(null);
                con.close();
                return callback(data);
            });
        });
    },

    createMessage: function (req, callback) {
        var con = mariadb.createConnection({
            host: hostname,
            user: dbUser,
            password: dbPasswd,
            database: msgDb
        });

        con.connect(err => {
            if (err) {
                return callback(false);
            } else {
                con.query("INSERT INTO messages (sender, topic, message) values( ?, ?, ?)", [req.sender, req.topic, req.message], (err, result) => {
                    if (err) return callback(false);
                    con.query("COMMIT", (err, ans) => {
                        ;
                        con.query("SELECT * FROM messages", (err, data) => {
                            if (err) return callback(false);
                            con.close();
                            // messages = data;
                            return callback(true);
                        });
                    });
                });
            };
        });
    },

    verifyUserId: function (req, callback) {
        // otetaan yhteys Maria-tietokantaan
        var con = mariadb.createConnection({
            host: hostname,
            user: dbUser,
            password: dbPasswd,
            database: msgDb
        });
        con.connect(err => {
            if (err) return callback("Access denied");
            con.query("SELECT * FROM users where (username) = (?)", [req.body.username], (err, result) => {
                if (err) return callback(err);;
                if (result.length == 0)
                    result = "not exist";
                else
                    if (bcrypt.compareSync(req.body.passwd, result[0].password))
                        result = "exist";
                    else
                        result = "not valid";
                con.end();
                return callback(result);
            });
        });
    },

    registerUser: function (req, callback) {
        // otetaan yhteys Maria-tietokantaan
        var con = mariadb.createConnection({
            host: hostname,
            user: dbUser,
            password: dbPasswd,
            database: msgDb
        });
        con.connect(err => {
            if (err) {
                result = "Access denied";
                callback(result);
            } else {
                con.query("SELECT * FROM users where username = (?)", [req.body.username], (err, result) => {
                    if (err) throw err;
                    var hash = bcrypt.hashSync(req.body.passwd, 10);
                    if (result.length == 0) {
                        con.query("INSERT INTO users (username, password) values (?, ?)", [req.body.username, hash], (err, result) => {
                            if (err) throw err;
                            result = "Username " + req.body.username + " registered";
                            con.query('COMMIT');
                            con.end();
                            return callback(result);
                        });
                    }
                    else {
                        result = "Username already exists";
                        con.end();
                        return callback(result);
                    }
                });
            };
        });
    },
    deleteMessageById: function (id, callback) {
        // otetaan yhteys Maria-tietokantaan
        var con = mariadb.createConnection({
            host: hostname,
            user: dbUser,
            password: dbPasswd,
            database: msgDb
        });

        con.connect(err => {
            if (err) {
                result = "Access denied";
                callback(result);
            } else {
                con.query("DELETE FROM messages where id = (?)", [parseInt(id)], (err, result) => {
                    if (err) callback(false);
                    con.query("COMMIT", (err, ans) => {
                        ;
                        con.query("SELECT * FROM messages", (err, data) => {
                            if (err) callback(false);
                            con.close();
                            return callback(data);

                        });
                    });
                });
            };
        });

    },

    editMessageById: function (req, callback) {
        // otetaan yhteys Maria-tietokantaan
        var con = mariadb.createConnection({
            host: hostname,
            user: dbUser,
            password: dbPasswd,
            database: msgDb
        });

        con.connect(err => {
            if (err) {
            result = "Access denied";
                callback(result);
            } else {
                con.query("UPDATE messages SET topic = (?), message = (?) where id = (?)", [req.topic, req.message, req.id], (err, result) => {
                    if (err) callback(false);
                    con.query("COMMIT", (err, ans) => {
                        ;
                        con.query("SELECT * FROM messages", (err, data) => {
                            if (err) callback(false);
                            con.close();
                            return callback(data);

                        });
                    });
                });
            };
        });

    }
}
