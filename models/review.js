const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
        content: {type: String}, 
        rating: {type: Number, min: 0, max: 5, default: 0}, 
        liked: {type: Boolean, default: false}, 
        recipeId: {type: Schema.Types.ObjectId, ref: 'Recipe'}, 
        createdByUserId: {type: Schema.Types.ObjectId, ref: 'User'}
    }, {
        timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema)