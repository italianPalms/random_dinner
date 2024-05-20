import express from 'express';
import DinnerName from '../models/dinnerModel.js';
import { json } from 'stream/consumers';
const router = express.Router();

router.use(express.json());

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
        res.status(201).json({message: 'Dinner added to mongoDB successfully'});
    } catch (err) {
        console.log('addDinner failed' + err)
        res.status(500).json({message: 'add new dinner failed'})
    }
})

router.get('/getDinner', async (req, res) => {
    try {
        const timeCategory = req.params.timeCategory;
        //Query the database for a random dinner with the specified time category
        const randomDinner = await DinnerName.aggregate([
            { $match: { timeCategory: timeCategory } },
            { $sample: { size: 1 } },
        ]);

        if (randomDinner.lenght === 0) {
            res.status(404).json({ message: "No dinner found for the specified time category" });
        } else {
            res.status(200).json(randomDinner[0]);
        }
    } catch (err) {
        console.error('failed to fetch random dinner', err);
        res.status(500).json({message: 'get dinner failed'})
    }
})

export default router;