import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/router.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB is connected'))
.catch(err => console.log(err))

//CORS configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'https://random-dinner.vercel.app/'],
    credentials: true, 
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router); //api here may break the vercel application

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
