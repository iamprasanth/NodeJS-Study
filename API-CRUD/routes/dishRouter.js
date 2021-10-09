const express = require('express');
const dishRouter = express.Router();
const dishController = require('../controllers/dishController');

dishRouter.route('/')
    // Retrieve all dishes
    .get(dishController.getAllAsync)
    // Create a new dish
    .post(dishController.create)
    // Delete all dish
    .delete(dishController.delete);

// Retreive dish by specifying it's name
dishRouter.route('/by-name/:dishName').get(dishController.getOneByName)

dishRouter.route('/:dishId')
    // Retrieve a specifi dish
    .get(dishController.getOne)
    // update an existing dish
    .put(dishController.update)
    // Delete all dish
    .delete(dishController.delete);

dishRouter.route('/:dishId/comments')
    // Retrieve all comments of a specifi dish
    .get(dishController.getAllDishComments)
    // create a new comments for a specifi dish
    .post(dishController.createDishComment)
    // delete all comments under a specifi dish
    .delete(dishController.deleteAllDishComments);

dishRouter.route('/:dishId/comments/:commentId')
    // Retrieve a specific comments of a specifi dish
    .get(dishController.getOneDishComment)
    // Update a specific comments of a specifi dish
    .put(dishController.updateDishComment)
    // Delete a specific comments under a specifi dish
    .delete(dishController.deleteOneDishComment);

module.exports = dishRouter
