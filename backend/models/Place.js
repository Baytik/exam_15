const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String]
    },
    comments: [
        {
            author: String,
            comment: String,
            quality: Number,
            service: Number,
            interior: Number,
            date: String
        }
    ],
    views: {
        type: Number,
        default: 0
    },
    rating: {
      type: Number
    },
    quality: {
      type: Number
    },
    service: {
        type: Number
    },
    interior: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Place = mongoose.model('Place', RecipeSchema);

module.exports = Place;