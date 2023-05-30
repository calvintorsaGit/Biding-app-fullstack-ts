import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


export interface IUser extends mongoose.Document {
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(password: string): any;
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

UserSchema.pre("save", async function (next) {

    const user = this as any;

    if (!user.isModified("password")) return next();

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();

})

UserSchema.methods.comparePassword = async function (password: string) {
    const user = this as IUser;
    return bcrypt.compareSync(password, user.password);
}

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
