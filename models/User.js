const mongoose = require("mongoose");
const LanguageEnum = ['English', 'Spanish', 'French', 'German'];
const RoleEnum = ['Student', 'Client', 'Professor', 'Learner'];
const DaysEnum = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const domainEnum = [
    "UI/UX Designing",
    "Engineering",
    "Product Management",
    "Data Analysis",
    "Consultancy",
    "Research",
    "Software Development",
    "Marketing and Branding",
    "Business Development",
    "Project Management",
    "Sustainability",
    "AI/ML"
];

const InviteSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    name: { type: String }
});

const SocialMediaSchema = new mongoose.Schema({
    description: { type: String },
    url: { type: String }
});

const aiToolsSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String }
})

const UserSchema = new mongoose.Schema({
    name: { type: String },
    avatarUrl: { type: String },
    email: { type: String, unique: true, required: true },
    domain: { type: [String], enum: domainEnum },
    role: { type: String, enum: RoleEnum },
    companyName: { type: String },
    sectorName: { type: String },
    institute: { type: String },
    expertise: {
        tools: [{ type: String }],
        certificates: [{ type: String }],
        skills: [{ type: String }]
    },
    preferredTimeZone: { type: String },
    availableDays: { type: [{ type: String, enum: DaysEnum }] },
    startTime: { type: String },
    endTime: { type: String },
    fees: {
        preferredCurrency: { type: String },
        hourlyRate: { type: Number }
    },
    socialMedia: [SocialMediaSchema],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    invites: { type: [{type: InviteSchema}] , default: []} ,
    lastLogin: { type: Date },
    paymentsCompleted: { type: Number, default: 0 },
    projectsPosted: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    aiTools: [aiToolsSchema],
    aiToolsLimit: { type: Number, default: 3 }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
