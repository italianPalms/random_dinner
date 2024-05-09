import express from 'express';
import dinnerName from '../models/dinnerModel';
const router = express.Router();


router.post('/addDinner', async (req, res) => {
    try {
        const {dinnerName, timeCategory} = req.body;
        console.log(req.body);
        const newDinner = new dinnerName ({
            dinnerName, 
            timeCategory,
        });
        //save the dinner name
        const savedDinnerName = await newDinner.save();
        console.log('New dinner is saved in mongoDB' + savedDinnerName);
    } catch (err:any) {
        console.log('addDinner failed' + err)
        res.status(500).json({message: 'add new dinner failed'})
    }
})