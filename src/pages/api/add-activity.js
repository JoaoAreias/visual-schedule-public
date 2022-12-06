import client from "../../lib/prismadb";

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    if(req.method === 'POST') {
        const DAYS_OF_WEEK = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const { userId, title, time, weekdays, image } = req.body;
        const data = {
            userId,
            title,
            time,
            completed: false,

        }

        // Add days of week to data object
        for(let i = 0; i < DAYS_OF_WEEK.length; i++) {
            if(weekdays.includes(DAYS_OF_WEEK[i])) {
                data[DAYS_OF_WEEK[i]] = true;
            } else {
                data[DAYS_OF_WEEK[i]] = false;
            }
        }
        
        // Add image to data object
        data.image = image;
        
        // Insert data into database
        try {
            const task = await client.task.create({
                data,
            });
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}