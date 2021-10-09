const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
// Middleware to parse the incoming requests from frontend
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    // All routes matching the pattern will visit here
    // Not necessary
    .all((req,res,next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        // Next function will make sure the below routes get executed
        // else every route will execute here and stop
        next();
    })
    // Get all leaders
    .get((req,res,next) => {
        res.end('Will send all the leaders to you!');
    })
    // Create a new leader
    .post((req, res, next) => {
        res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
    })
    // Delete all leaders
    .delete((req, res, next) => {
        res.end('Deleting all leaders');
    });

leaderRouter.route('/:leaderId')
    // All routes matching the pattern will visit here
    // Not necessary
    .all((req,res,next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        // Next function will make sure the below routes get executed
        // else every route will execute here and stop
        next();
    })
    // Get a specific leader
    .get((req,res,next) => {
        res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
    })
    // Update a specific leader
    .put((req, res, next) => {
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + 
            ' with details: ' + req.body.description);
    })
    // Delete a specific leader
    .delete((req, res, next) => {
        res.end('Deleting leader: ' + req.params.leaderId);
    });

module.exports = leaderRouter;