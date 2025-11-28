import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

const ContentBlockSchema = new Schema({
    heading: { type: String },
    type: {
        type: String,
        enum: ['content', 'code', 'image'],
        required: true
    },
    content: { type: String },
    image: {
        type: String,
    },
    code: {
        type: String
    }
});

const UserSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        date: String,
        author: String,
        image: {
            type: String,
            
        },
        fileurl: String,
        videourl: String,
        tag: {
            type: String,
            required: true,
            unique: false
        },
        contentBlocks: [ContentBlockSchema],
        readingtime: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Userpost = mongoose.models.posts || mongoose.model('posts', UserSchema);

export default Userpost;
