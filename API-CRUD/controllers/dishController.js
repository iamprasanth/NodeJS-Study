const Dish = require('../models/dishes');
const responseController = require('./responseController');

// Retrieve and return all dishes from the database.
exports.getAll = (req, res) => {

    // To get QUERY string parameters
    console.log(req.query);

    Dish.find()
        .then(dishes => {
            responseController.succesResponse(res, dishes);
        }).catch(err => {
            responseController.errorResponse(res, 500, "Some error occurred while retrieving dishes.");
        });
};

// Retrieve and return all dishes from the database unsing async await
exports.getAllAsync = async (req, res) => {
    try {
        const dishes = await Dish.find();

        responseController.succesResponse(res, dishes);
    } catch (err) {
        responseController.errorResponse(res, 500, "Some error occurred while retrieving dishes.");
    }
    console.log(1121);
};

// Get a specific dish
exports.getOne = (req, res) => {
    Dish.findById(req.params.dishId, 'name description')
        .then(dish => {
            if (!dish) {
                responseController.errorResponse(res, 404, "dish not found with id " + req.params.dishId);
            }
            res.send(dish);
        }).catch(err => {
            // If dishId passed is of wrong _id syntax, mongoose will raise exception
            if (err.kind === 'ObjectId') {
                //If return not given, execution wont stop and exception (header to client set twice) will be raised
                return responseController.errorResponse(res, 404, "dish not found with id " + 'req.params.dishId');
            }
            responseController.errorResponse(res, 500, "Error retrieving dish with id " + req.params.dishId);
        });
};

// Get a specific dish by dish name
exports.getOneByName = (req, res) => {
    // retirevies only name and decription
    const { dishName } = req.params;
    Dish.find({ name: dishName }, 'name description')
        .then(dish => {
            if (!dish) {
                return res.status(404).send({
                    message: "dish not found with id " + dishName
                });
            }
            res.json(dish);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "dish not found with id " + dishName
                });
            }
            return res.status(500).send({
                message: "Error retrieving dish with id " + dishName
            });
        });
};

// Get a specific dish by dish description
exports.getOneByDescription = (req, res) => {
    Dish.find({ name: req.params.dishDescription })
        .then(dish => {
            if (!dish) {
                return res.status(404).send({
                    message: "dish not found with id " + req.params.dishDescription
                });
            }
            res.send(dish);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "dish not found with id " + req.params.dishDescription
                });
            }
            return res.status(500).send({
                message: "Error retrieving dish with id " + req.params.dishDescription
            });
        });
};

// Cratea a new dish
exports.create = (req, res) => {
    // Create a dish
    const dish = new Dish({
        name: req.body.name,
        description: req.body.description
    });

    // OR
    // const task = await Dish.create({
    //     name: req.body.name,
    //     description: req.body.description
    // })

    // Save dish in the database
    dish.save()
        .then(dishes => {
            res.send(dishes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the dish."
            });
        });
};

// Update a specific dish
exports.update = (req, res) => {
    // Find dish and update it with the request body
    // Update can be findOneAndUpdate
    // Dish.findOneAndUpdate({name: req.params.name}, {
    Dish.findByIdAndUpdate(
        req.params.dishId, // Filter
        req.body, // Updation array
        { new: true } // To rutern the newly updated document
    ).then(dish => {
        if (!dish) {
            return res.status(404).send({
                message: "a dish not found with id " + req.params.dishId
            });
        }
        res.send(dish);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "a dish not found with id " + req.params.dishId
            });
        }
        return res.status(500).send({
            message: "Error updating dish with id " + req.params.dishId
        });
    });
};

// Delete a dish with the specified dishId in the request
exports.delete = (req, res) => {
    Dish.findByIdAndRemove(req.params.dishId)
        .then(dish => {
            if (!dish) {
                return res.status(404).send({
                    message: "dish not found with id " + req.params.dishId
                });
            }
            res.send({ message: "dish deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "dish not found with id " + req.params.dishId
                });
            }
            return res.status(500).send({
                message: "Could not delete dish with id " + req.params.dishId
            });
        });
};

// Retrieve all comments of a specifi dish
exports.getAllDishComments = (req, res) => {
    Dish.findById(req.params.dishId, 'comments')
        .then(dish => {
            if (!dish) {
                return res.status(404).send({
                    message: "dish not found with id " + req.params.dishId
                });
            }
            res.send(dish.comments);
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "dish not found with id " + req.params.dishId
                });
            }
            return res.status(500).send({
                message: "Could not delete dish with id " + req.params.dishId
            });
        });
};

// create a new comments for a specifi dish
exports.createDishComment = (req, res) => {
    Dish.findByIdAndUpdate(
        req.params.dishId, // Filter
        { $push: { comments: req.body.comments } }, // Array to be pushed
        { new: true }
    ).then(dish => {
        if (!dish) {
            return res.status(404).send({
                message: "a dish not found with id " + req.params.dishId
            });
        }
        res.send(dish);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "a dish not found with id " + req.params.dishId
            });
        }
        return res.status(500).send({
            message: "Error updating dish with id " + req.params.dishId
        });
    });
};

// delete all comments under a specifi dish
exports.deleteAllDishComments = (req, res) => {
    Dish.updateMany(
        { "_id": req.params.dishId }, // Filter
        { "comments": [] }, // Updation
        { new: true }
    ).then(dish => {
        if (!dish) {
            return res.status(404).send({
                message: "dish not found with id " + req.params.dishId
            });
        }
        dish.
            res.send({ message: "dish comments deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "dish not found with id " + req.params.dishId
            });
        }
        console.log(err);
        return res.status(500).send({
            message: "Could not delete dish with id " + req.params.dishId
        });
    });
};

// Retrieve a specific comments of a specifi dish
exports.getOneDishComment = (req, res) => {
    Dish.findById(req.params.dishId)
        .then(dish => {
            if (!dish) {
                return res.status(404).send({
                    message: "dish not found with id " + req.params.dishId
                });
            }
            res.send(dish.comments.id(req.params.commentId));
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "dish not found with id " + req.params.dishId
                });
            }
            return res.status(500).send({
                message: "Error retrieving dish with id " + req.params.dishId
            });
        });
};

// Update a specific comments of a specifi dish
exports.updateDishComment = (req, res) => {
    Dish.findById(req.params.dishId)
        .then(dish => {
            if (!dish) {
                return res.status(404).send({
                    message: "a dish not found with id " + req.params.dishId
                });
            }
            console.log(dish)
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;
            }
            dish.save()
                .then((dish) => {
                    res.json(dish);
                }, (err) => next(err));
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "a dish not found with id " + req.params.dishId
                });
            } console.log(err);

            return res.status(500).send({
                message: "Error updating dish with id " + req.params.dishId
            });
        });
};

// Delete a specific comments under a specifi dish
exports.deleteOneDishComment = (req, res) => {
    Dish.findById(req.params.dishId)
        .then(dish => {
            if (!dish) {
                return res.status(404).send({
                    message: "a dish not found with id " + req.params.dishId
                });
            }
            dish.comments.id(req.params.commentId).remove();
            dish.save()
                .then((dish) => {
                    res.json(dish);
                }, (err) => next(err));
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "a dish not found with id " + req.params.dishId
                });
            }
            return res.status(500).send({
                message: "Error updating dish with id " + req.params.dishId
            });
        });
};
