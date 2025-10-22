const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id : {type: String, unique: true, required: true},
    name : {type: String, required: true},
    description : {type: String, required: true},
    price : {type: Number, required: true},
    category : {type: String, required: true},
    inStock : {type: Boolean, required: true},
},{timestamps: true});


// Add any instance methods or static methods here if needed
productSchema.statics.findByCategory = function(category) {
    return this.find({ category: category });
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;