const mongoose = require('mongoose');
const yup = require('yup');
const { boolean } = require('yup/lib/locale');

// USER SCHEMA
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    contact: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    dateSignedIn: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "approved"
    }
});

const validateUser = user => {
    const schema = yup.object().shape({
        userName: yup.string().required().min(3, 'Name must be greater than 3').max(100, 'Name must be less than 100'),
        userEmail: yup.string().required().min(10, 'Email Address must be greater than 10').max(50, 'Email Address must be less than 50'),
        userPassword: yup.string().required().min(5, 'Password must be greater than 5').max(50, 'Password must be less than 50'),
        userContact: yup.string().required().min(5, 'Contact Number must be greater than 5').max(50, 'Contact Number must be less than 50'),
        userDateSignedIn: yup.date(),
        userStatus: yup.boolean()
    });

    return schema
        .validate(user)
        .then(user => user)
        .catch((error) => {
            return {
                message: error.message
            }
        });
}

exports.User = new mongoose.model('User', UserSchema);
exports.validateUser = validateUser;