var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var db = require('../dbOperations');
/**Tätä osiota kutsutaan apiksi */
/* GET - palauta kaikki tiedot. */
router.get('/', function(req, res) {
    db.findMessages(function( result ) {
//		res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
        res.json( result )
    });
});

router.post('/', function(req, res, next) {
    db.createMessage( req.body, function( data ) {
        if(data)
    		res.status(201).send({message: "Viesti lähetetty! Valitse Viestit jatkaaksesti."});
        else
			res.status(404).send({error: "Viestin lähetys epäonnistui! Ota yhteyttä ylläpitoon. Valitse Viestit jatkaaksesti."});
    });
});

/* GET - palauta yksittäisen viestin tiedot */
router.get('/:id', function(req, res, next) {
    res.status(501).send("HTTP - GET: yksittäisen viestin haun toteutus puuttuu!")
});

/* DELETE poista yksittäinen viesti. */
router.delete('/:id', function(req, res, next) {
    db.deleteMessageById(req.params.id, function(data){
        if(data){
            res.status(201).send({message:"Viesti poistettu"})
        }else{
            res.status(401).send({message:"ei onnistuna"})
        }
    })
	
});

/* PATCH päivitä yksittäisen viestin jokin kenttä. */
router.patch('/:id', function(req, res, next) {
    res.status(501).send("HTTP - PATCH: toteutus puuttuu!")
});

/* PUT päivitä yksittäinen viesti. */
router.put('/:id', function(req, res, next) {
    res.status(501).send("HTTP - PUT: toteutus puuttuu!")
});

module.exports = router;
