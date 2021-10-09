const express = require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router();
// Middleware to parse the incoming requests from frontend
promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
    // All routes matching the patter will visit here
    // Not necessary
    .all((req,res,next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        // Next function will make sure the below routes get executed
        // else every route will execute here and stop
        next();
    })
    // Get all promotions
    .get((req,res,next) => {
        res.end('Will send all the promotions to you!!!');
    })
    // Create a new promotions
    .post((req, res, next) => {
        res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    })
    // Delete all promotions
    .delete((req, res, next) => {
        res.end('Deleting all dishes');
    });

promotionRouter.route('/:promotioId')
    // All routes matching the patter will visit here
    // Not necessary
    .all((req,res,next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        // Next function will make sure the below routes get executed
        // else every route will execute here and stop
        next();
    })
    // Get a specific promotion
    .get((req,res,next) => {
        res.end('Will send details of the promotion: ' + req.params.promotioId +' to you!');
    })
    // Update a specific promotion
    .put((req, res, next) => {
    res.write('Updating the promotion: ' + req.params.promotioId + '\n');
    res.end('Will update the promotion: ' + req.body.name + 
            ' with details: ' + req.body.description);
    })
    // Delete a specific promotion
    .delete((req, res, next) => {
        res.end('Deleting promotion: ' + req.params.promotioId);
    });

module.exports = promotionRouter;