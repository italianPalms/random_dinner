import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/router.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB is connected'))
.catch(err => console.log(err))

//CORS configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'https://random-dinner.vercel.app'],
    credentials: true, 
}

app.get('/api', (req, res) => {
    res.send('Hello from API!');
  });

app.use(cors(corsOptions));
app.use('/', router);

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
