import mongoose from 'mongoose';

const loungeSchema = new mongoose.Schema({

    currentMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    title: { type: String },
    domains: [{ type: String }],
    slotsLeft: { type: Number },
    expiryDate:{type:Date}

});

const Lounge = mongoose.models.Lounge || mongoose.model('Lounge', loungeSchema);

export default Lounge;
