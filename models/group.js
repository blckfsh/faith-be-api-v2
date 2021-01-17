const mongoose = require('mongoose');
const yup = require('yup');
const { boolean } = require('yup/lib/locale');

// GROUP SCHEMA
const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    membersCount: {
        type: Number,
        default: 0
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "active"
    }
});

const validateGroup = group => {
    const schema = yup.object().shape({
        groupName: yup.string().required().min(3, 'Name must be greater than 3').max(50, 'Name must be less than 50'),
        groupDescription: yup.string().required().min(5, 'Description must be greater than 5').max(50, 'Description must be less than 50'),
        groupMembersCount: yup.number(),
        groupDateCreated: yup.date(),
        groupStatus: yup.boolean()
    });

    return schema
        .validate(group)
        .then(group => group)
        .catch((error) => {
            return {
                message: error.message
            }
        });
}

exports.Group = new mongoose.model('Group', GroupSchema);
exports.validateGroup = validateGroup;