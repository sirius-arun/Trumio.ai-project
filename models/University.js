const mongoose = require("mongoose");
import User from "./User";
import Project from "./Project";
const TypeEnum = ['Engineering','Medical','Agriculture'];

const postsSchema = new mongoose.Schema({
    postAvatarUrl: {type: String},
    name:{type: String},
    description: {type: String},
    postUrl: {type: String},
    likes: {type:Number},
    comment: {type: Number}
})

const labSchema = new mongoose.Schema({
    name: {type:String},
    about: {type:String},
    professor: {type: mongoose.Schema.Types.ObjectId,
        ref: 'User'},
    avatarUrl:{type:String},
    Members:[{type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}],
    Achievements:[{type:String}],
    projects:[{type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'}],
    posts:[postsSchema]
})

const ClubsSchema = new mongoose.Schema({
    name: {type: String},
    avatarUrl: {type: String},
    about: {type: String},
    Members: [{type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}],
    posts: [postsSchema],
    Achievements: [{type:String}],
    projects: [{type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'}]
})

const startupSchema = new mongoose.Schema({
    name: {type: String},
    avatarUrl: {type: String},
    about: {type: String},
    members: [{type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}],
    Founders:[{type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}]
})

const UniversitySchema = new mongoose.Schema({
    name: { type: String },
    type: {type: String,enum: TypeEnum},
    members:[{type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}],
    professors:[{type: mongoose.Schema.Types.ObjectId,
            ref: 'User'}],
    labcount: {type: Number},
    address: {type: String},
    description: {type: String},
    domains: {type: String},
    sector: {type: String},
    followers: {type: Number},
    projects: [{type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'}],
    about: {type: String},
    profileUrl: {type: String},
    backgroundUrl: {type: String},
    Ranking: {type: Number},
    alumni:[{type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}],
    student:[{type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}],
    posts: [postsSchema],
    labs: [labSchema],
    tags: [{type: String}],
    grade: {type: String},
    clubs: [ClubsSchema],
    establishedIn: {type: Number},
    startup: [startupSchema]
}, { timestamps: true });

export default mongoose.models.University || mongoose.model("University", UniversitySchema);
