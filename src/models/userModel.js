import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    interest: {
        type: [String],
        default: [],
    },
    age: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
})
const Users = mongoose.models.users || mongoose.model('users', userSchema);

export default Users;