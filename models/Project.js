import mongoose from 'mongoose';

const statusEnum = ['In Progress', 'Completed','Not Started'];
const appsEnum = [('Figma', 'http://figma.com')];
const toolsEnum = ['Engineering', 'Design'];
const domainEnum  = [
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
const ApplicationSchema = new mongoose.Schema({
  tool:{type:String},
  url:{type:String},
  connectedOn:{type:Date},
  connectedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}

})
export const workSchema = new mongoose.Schema({

  title:{type:String},
  url:{type:String}
  
});


const clientRequirementsSchema = new mongoose.Schema({
  paymentType: {
    type: String,
    enum: ['Fixed', 'Installment']
  },
  payment: {
    type: Number
  },
  workDays: { type: [String], enum: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'] },
  requiredTools: { type: [String] },
  file: { type: workSchema }
});
export const subMilestoneSchema = new mongoose.Schema({
  title: { type: String },
  status: { type: String, enum: statusEnum, default: 'Not Started' },
  description: { type: String },
  stickyNotes: { type: [String], default: [] },
  work: { type: workSchema }
});

const activitySchema = new mongoose.Schema({
  submilestone:{ type: subMilestoneSchema},
  type: { type: String, enum: ['CREATE', 'EDIT', 'DELETE', 'Message'] },
  timestamp: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String }
});



export const milestoneSchema = new mongoose.Schema({
  dueDate: { type: Date },
  heading: { type: String},
  description: { type: String },
  submilestones: [subMilestoneSchema],
  status: { type: String, enum: statusEnum, default: 'Not Started' },
  payment: { type: Number },
  paymentDate: { type: Date },
  deliverables : { type: String },
  duration: { type: Number },
  paymentCompleted: {type: Boolean, default: false}
});

const healthSchema = new mongoose.Schema({
  progress: {
    type: Number,
    default: 0
  }
});

const projectSchema = new mongoose.Schema({
  title: { type: String},
  statement: { type: String },
  milestones: [milestoneSchema],
  assignedTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  health: healthSchema,
  startDate: { type: Date },
  endDate: { type: Date },
  activities: [activitySchema],
  clientRequirements: clientRequirementsSchema,
  work: [workSchema],
  duration: { type: Number },
  domain: { type: [{ type: String ,enum:domainEnum}] },
  postedOn: {type: Date, default: Date.now},
  status: {type: String, enum: ['Open', 'In Review', 'Completed', 'Assigned'], default: 'Open'},
  location: { type: String},
  connectedApps: { type: [ApplicationSchema] },
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
