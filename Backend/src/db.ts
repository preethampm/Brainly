
import mongoose, {model, Schema} from "mongoose";

//mongoose.connect("mongodb+srv://d0wnfa11:EbsasbuZJrnYKjQ6@cluster0.yeet3.mongodb.net/brain")
mongoose.connect("mongodb://admin:adminpassword@localhost:27017/brain?authSource=admin")

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})

export const UserModel = model("User", UserSchema);

const TagSchema = new Schema({
    name: {type: String, unique: true},
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
})

export const TagModel = model("Tag", TagSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})

export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);