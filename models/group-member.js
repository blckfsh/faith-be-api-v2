const mongoose = require('mongoose');
const yup = require('yup');
const { boolean } = require('yup/lib/locale');

// GROUP MEMBER SCHEMA
const GroupMemberSchema = new mongoose.Schema({
    group_id: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50
    },
    user_id: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50
    },
    dateInvited: {
        type: Date,
        default: Date.now
    },
    dateJoined: {
        type: Date,
    },
    status: {
        type: String,
        default: "added"
    }
});

const validateGroupMember = groupMember => {
    const schema = yup.object().shape({
        gmGroup_id: yup.string().required().min(10, 'Group ID must be greater than 10').max(50, 'Group ID must be less than 50'),
        gmUser_id: yup.string().required().min(10, 'User ID must be greater than 10').max(50, 'User ID must be less than 50'),
        gmDateInvited: yup.date(),
        gmDateJoined: yup.date(),
        gmStatus: yup.boolean()
    });

    return schema
        .validate(groupMember)
        .then(groupMember => groupMember)
        .catch((error) => {
            return {
                message: error.message
            }
        });
}

exports.GroupMember = new mongoose.model('Group Member', GroupMemberSchema);
exports.validateGroupMember = validateGroupMember;