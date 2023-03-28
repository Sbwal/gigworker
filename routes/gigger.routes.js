const express = require('express');
const { Worker, Gig, Gigger } = require('../models/models');

const giggerRouter = express.Router();

giggerRouter.post('/', async (req, res) => {
    try {
        const { workerId, gigId } = req.body;
        const worker = await Worker.findById(workerId);
        const gig = await Gig.findById(gigId);

        if (!worker) {
            return res.status(404).json({ error: 'Worker not found' });
        }

        if (!gig) {
            return res.status(404).json({ error: 'Gig not found' });
        }

        const gigger = new Gigger({ worker, gig });
        const saveGigger = await gigger.save();

        // Update gig gigger count
        gig.giggercount += 1;
        await gig.save();

        res.json({ message: 'Gigger added successfully', saveGigger });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

giggerRouter.get('/:gigId', async (req, res) => {
    try {
        const { gigId } = req.params;
        const giggers = await Gigger.find({ gig: gigId }).populate('worker');
        const workers = giggers.map((gigger) => gigger.worker);
        res.status(200).send(workers);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error retrieving workers for gig.' });
    }
});

giggerRouter.delete('/:gigId/workers/:workerId', async (req, res) => {
    try {
        const { gigId, workerId } = req.params;

        const result = await Gigger.deleteOne({ gig: gigId, worker: workerId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        return res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error removing worker from gigger.' });
    }
});


module.exports = giggerRouter;