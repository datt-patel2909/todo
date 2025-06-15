const mongoose = require('mongoose');

const Todoschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a name'],
        trim: true,
        maxlength: [20, 'length can not be more than 20']
    },
    completed: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        required: [true, 'must provide a description'],
        trim: true,
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Todo', Todoschema);
