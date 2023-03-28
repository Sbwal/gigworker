const express = require('express');
const { Worker } = require('../models/models');

const workerRouter = express.Router();

workerRouter.post('/', async (req, res) => {
    try {
        const worker = new Worker({
            name: req.body.name,
            phone: req.body.phone,
            workerid: req.body.workerid
        });
        await worker.save();
        res.send(worker);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

workerRouter.get('/', async (req, res) => {
    try {
        const workers = await Worker.find();
        res.send(workers);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

workerRouter.get('/:id', async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id);
        if (!worker) {
            return res.status(404).json({ error: 'Worker not found' });
        }
        res.json(worker);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

workerRouter.put('/:id', async (req, res) => {
    try {
        const { name, phone } = req.body;
        const result = await Worker.updateOne({ _id: req.params.id }, { name, phone });
        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Worker not found' });
        }
        res.json({ message: 'Worker updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = workerRouter;