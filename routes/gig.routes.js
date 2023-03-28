const express = require('express');
const { Gig } = require('./models/models');

const gigRouter = express.Router();

gigRouter.post('/', async (req, res) => {
    try {
        const gig = new Gig({
            gigtype: req.body.gigtype,
            gigid: req.body.gigid
        });
        await gig.save();
        res.send(gig);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

gigRouter.get('/', async (req, res) => {
    try {
        const gigs = await Gig.find();
        res.send(gigs);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

gigRouter.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const result = await Gig.updateOne({ _id: req.params.id }, { status });
        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Gig not found' });
        }
        res.json({ message: 'Gig status updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = gigRouter;