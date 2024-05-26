import mongoose from 'mongoose';

const dinnerSchema = new mongoose.Schema({
    dinnerName: {
        type: String, 
        required: [true, 'Please provide a dinner name'],
        unique: true,
    },
    timeCategory: {
        type: String, 
        required: [true, 'Please provide a time category'],
    },
    //TODO healthiness 
});

const DinnerName = mongoose.models.dinnerName || mongoose.model('DinnerName', dinnerSchema);

export default DinnerName;