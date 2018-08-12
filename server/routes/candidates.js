var express = require('express');
var router = express.Router();
var Candidate = require('../models/candidate')
var mongoose = require('mongoose');


router.get('/', function (req, res, next) {
    Candidate.find({}, { _id: 1, name: 2 }, function (err, candidates) {
        if (err)
            return res.status(501).json(err);
        else
            return res.status(200).send(candidates);
    });
});


module.exports = router;
