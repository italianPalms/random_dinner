import express from 'express';
import DinnerName from '../models/dinnerModel.js';
const router = express.Router();


router.post('/addDinner', async (req, res) => {
    try {
        const {dinnerName, timeCategory} = req.body;
        console.log(req.body);
        const newDinner = new DinnerName ({
            dinnerName, 
            timeCategory,
        });
        //save the dinner name
        const savedDinnerName = await newDinner.save();
        console.log('New dinner is saved in mongoDB' + savedDinnerName);
    } catch (err
    ) {
        console.log('addDinner failed' + err)
        res.status(500).json({message: 'add new dinner failed'})
    }
})

export default router;