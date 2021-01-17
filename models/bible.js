const mongoose = require('mongoose');
const yup = require('yup');
const { boolean } = require('yup/lib/locale');

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
        maxlength: 9999
    },
    version: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    testament: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50

    },
    status: {
        type: boolean,
        default: false
    }
});

const validateBible = bible => {
    const schema = yup.object().shape({
        verseTitle: yup.string().required().min(3, 'Title must be greater than 3').max(50, 'Title must be less than 50'),
        verseMessage: yup.string().required().min(5, 'Message must be greater than 5').max(9999, 'Message must be less than 9999'),
        verseVersion: yup.string().required().min(2, 'Version must be greater than 2').max(10, 'Version must be less than 10'),
        verseTestament: yup.string().required().min(3, 'Testament must be greater than 3').max(50, 'Testament must be less than 50'),
        verseStatus: yup.boolean()
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