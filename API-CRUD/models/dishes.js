const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Rating is required']
    },
    comment: {
        type: String,
        required: [true, 'Commment is required']
    },
    author: {
        type: String,
        required: [true, 'Author name is required']
    },
    is_deleted: {
        type: Number,
        min: [0, 'Minimum value for is_deleted field is 0'],
        max: [1, 'Maximum value for is_deleted field is 1'],
        required: [true, 'Is_deleted field is required'],
        default: 0
    }
}, {
    timestamps: true
});

var dishSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    // image: {
    //     type: String,
    //     required: true
    // },
    // category: {
    //     type: String,
    //     required: true
    // },
    // label: {
    //     type: String,
    //     default: ''
    // },
    // price: {
    //     type: Currency,
    //     required: true,
    //     min: 0
    // },
    featured: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema]
}, {
    timestamps: true
});
var Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;