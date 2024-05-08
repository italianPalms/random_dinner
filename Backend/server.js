import express from 'express';
const app = express();
const port = process.env.PORT || 4000;
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB is connected'))
.catch(err => console.log(err))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
