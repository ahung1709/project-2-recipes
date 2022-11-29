var mongoose = require('mongoose');
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    title: {type: String}, 
    desc: {type: String},
    pictures: {type: [String]}, 
    meals: {type: String}, 
    ingredients: {type: String}, 
    directions: {type: String}, 
    servings: {type: Number}, 
    prepTime: {type: Number}, 
    cookTime: {type: Number}, 
    notes: {type: String},
    private: {type: Boolean, default: false}, 
    createByUserId: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

module.exports = mongoose.model('Recipe', recipeSchema)