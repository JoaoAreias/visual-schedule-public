import client from "../../lib/prismadb";

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    if(req.method === 'POST') {
        try {
            const task = await client.task.delete({
                where: {
                    id: req.body.id,
                },
            });
            res.status(200).json(task);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}