import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const UserAuthSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    });

const Userauthpost = mongoose.models.Auth || mongoose.model('Auth', UserAuthSchema);

export default Userauthpost;