import mongoose from 'mongoose';
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        trim: true,
        required:false,
    },
    lastName: {
        type: String,
        trim: true,
        required:false,
    },
    color: {
        type: Number,
        required:false,
        default:0,
    },
    defaultProfile: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        required:false,
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});


userSchema.methods.comparePassword = function compare(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
}


const User = mongoose.model('User', userSchema);
export default User;