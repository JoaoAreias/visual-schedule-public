import client from "../../lib/prismadb";

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    if(req.method === 'POST') {
        const { id } = req.body;

        // Set activity to completed
        try {
            const task = await client.task.update({
                where: {
                    id: id
                },
                data: {
                    completed: true,
                },
            });
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}