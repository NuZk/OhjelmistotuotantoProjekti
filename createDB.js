const mariadb = require('mariadb/callback');
var hostname = "maria.westeurope.cloudapp.azure.com";
var dbnimi = process.argv.slice(2);
var dataSchema = "(\
	name VARCHAR(50),\
	address VARCHAR(50),\
	size VARCHAR(10),\
	distToLake VARCHAR(10),\
	description VARCHAR(1000),\
	accessories VARCHAR(500),\
	image VARCHAR(500)\
)";
var usersSchema = "(\
	username VARCHAR(100),\
	password VARCHAR(500)\
)";


var con = mariadb.createConnection({
    host: hostname,
    user: "opiskelija",
    password: "opiskelija"
});
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	var sql = "CREATE DATABASE " + dbnimi; 
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Database " + dbnimi + " created");
		sql = "USE " + dbnimi; 
		con.query(sql, function (err, result) {
			if (err) throw err;
			sql = "CREATE TABLE cottages " + dataSchema;
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log("Table cottages created");
				sql = "CREATE TABLE users " + usersSchema;
				con.query(sql, function (err, result) {
					if (err) throw err;
					console.log("Table users created");
					con.query("GRANT SELECT, INSERT, UPDATE, DELETE ON users TO 'testi'@'%'", function (err) {
						if (err) throw err;
						console.log("CRUD privileges to testi for users granted");
						con.close();
					});
				});
			});
		});
	});
});