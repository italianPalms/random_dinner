import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface Dinner {
    dinnerName: string, 
    timeCategory: string;
}

const dinnerSchema = new mongoose.Schema<Dinner>({
    dinnerName: {
        type: String, 
        required: [true, 'Please provide a dinner name'],
        unique: true,
    },
    timeCategory: {
        type: String, 
        required: [true, 'Please provide a time category'],
    },
});

const dinnerName = mongoose.models.dinnerName || mongoose.model('dinnerName', dinnerSchema);

export default dinnerName;