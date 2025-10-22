const validateProduct = (req, res, next) => {
    const { name, description, price, category } = req.body;
    const errors = [];

    // Validate required fields
    if (!name) errors.push('Product name is required');
    if (!description) errors.push('Product description is required');
    if (!category) errors.push('Product category is required');
    
    // Validate price
    if (price === undefined) {
        errors.push('Product price is required');
    } else if (typeof price !== 'number' || price < 0) {
        errors.push('Price must be a positive number');
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
        return res.status(400).json({ 
            message: 'Validation failed',
            errors: errors 
        });
    }

    // If validation passes, continue to the next middleware/route handler
    next();
};

module.exports = validateProduct;