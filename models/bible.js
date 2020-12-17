const mongoose = require('mongoose');
const yup = require('yup');

// BIBLE SCHEMA
const BibleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    message: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 3000
    },
    version: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10
    },
    testament: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50

    },
    status: {
        type: String,
        default: 'No'
    }
});

const validateBible = bible => {
    const schema = yup.object().shape({
        title: yup.string().required().min(3, 'Title must be greater than 3').max(50, 'Title must be less than 50'),
        message: yup.string().required().min(5, 'Title must be greater than 5').max(3000, 'Title must be less than 3000'),
        version: yup.string().required().min(3, 'Title must be greater than 3').max(10, 'Title must be less than 10'),
        testament: yup.string().required().min(3, 'Title must be greater than 3').max(50, 'Title must be less than 50'),
        status: yup.string()
    });

    return schema
        .validate(bible)
        .then(bible => bible)
        .catch((error) => {
            return {
                message: error.message
            }
        });
}

exports.Bible = new mongoose.model('Bible', BibleSchema);
exports.validateBible = validateBible;