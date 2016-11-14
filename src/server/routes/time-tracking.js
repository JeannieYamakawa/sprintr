const express = require('express');
const router = express.Router({
    mergeParams: true
});
const environment = process.env.NODE_ENV || "development";
const knexConfig = require('../../../knexfile')[environment];
const knex = require('knex')(knexConfig);



router.post('/log', function(req, res){

});

router.post('/get', function(req, res){

});


module.exports = router;
