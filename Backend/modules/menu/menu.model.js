import mongoose from "mongoose";

const normalizeStr = (v) => (typeof v === 'string' ? v.trim().toLowerCase() : v)
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        set: normalizeStr
    },
    description: {
        type: String,
        required: true,
        set: normalizeStr
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    // category: {
    //     type: String,
    //     required: true,
    //     set: normalizeStr,
    // },
    image: {
        type: String,
        default: '',
        trim: true
    },
    // isAvailable: {
    //     type: Boolean,
    //     default: true
    // },

    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
        index: true
    }
}, {
    timestamps: true
});
menuItemSchema.index({vendorId: 1, isAvailable: 1, category: 1, createdAt: - 1})
const menuDetails = mongoose.model('Menu', menuItemSchema);
export default menuDetails;