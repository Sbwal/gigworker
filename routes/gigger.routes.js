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

giggerRouter.get('/:gigId/workers', async (req, res) => {
    const { gigId } = req.params;

    try {
        const giggers = await Gigger.find({ gig: gigId }).populate('worker');
        res.status(200).send(giggers);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error retrieving workers assigned to gig.' });
    }
});

giggerRouter.delete('/giggers/:giggerId/workers/:workerId', async (req, res) => {
    const { giggerId, workerId } = req.params;

    try {
        const gigger = await Gigger.findById(giggerId);
        const gig = await Gig.findById(gigger.gig);

        // Remove worker from gigger
        gigger.worker = null;
        await gigger.save();

        // Decrement gigger count in gig
        gig.giggercount -= 1;
        await gig.save();

        // Return success response
        res.status(200).send({ message: 'Worker removed from gigger successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error removing worker from gigger.' });
    }
});


module.exports = giggerRouter;