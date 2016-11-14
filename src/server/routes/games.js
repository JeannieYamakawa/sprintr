const express = require('express');
const router = express.Router({
    mergeParams: true
});
const environment = process.env.NODE_ENV || "development";
const knexConfig = require('../../../knexfile')[environment];
const knex = require('knex')(knexConfig);


//create a new game, designate creator as the admin
router.post('/new', function(req, res){

});

//add user to an existing game
router.post('/join', function(req, res){

});

//admin can edit and existing game
router.patch('/:game_id', function(req, res){

});

//fetch details about a single game
router.get('/:game_id', function(req, res){

});


module.exports = router;
