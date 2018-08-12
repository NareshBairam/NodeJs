var express = require('express');
var router = express.Router();
var Vote = require('../models/vote')
var mongoose = require('mongoose');


router.post('/addVote', function (req, res, next) {
    var body = req.body;
    var userId = body.userId;
    Vote.findOne({ userId }, function (err, vote) {
        if (err) {
            return res.status(501).json(err);
        }
        else {
            if (!vote) {
                addVote(req, res)
            } else {
                return res.status(208).json({ message: "You already voted" });
            }
        }
    });
});


async function addVote(req, res) {
    console.log(req.body)
    var vote = new Vote({
        userId: req.body.userId,
        candidateId: req.body.candidateId,
        candidateName: req.body.candidateName
    })

    try {
        vote = await vote.save();
        return res.status(201).json(vote);
    }
    catch (err) {
        return res.status(501).json(err);
    }
}

router.get('/', function (req, res, next) {
    var data;
    Vote.aggregate([
        {
            $group: {
                _id: '$candidateId',
                candidateName: { $first: '$candidateName' },
                count: {
                    $sum: 1
                }
            }
        }
    ], function (err, result) {
        if (err)
            return res.status(501).json(err);
        else {
            data = result;
            return res.status(200).send(result);
        }
    });
});

module.exports = router;