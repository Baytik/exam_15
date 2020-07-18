const express = require('express');
const User = require('../models/User');
const bcrypt = require("bcrypt");

const router = express.Router();

router.post('/', async (req, res) => {
    if (req.file) {
        req.body.avatar = req.file.filename;
    }
    const object = {
        username: req.body.username,
        password: req.body.password
    };
    const user = new User(object);
    try {
        user.generateToken();
        await user.save();
        return res.send(user)
    } catch (error) {
        return res.status(400).send(error._message);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send({error: 'Username or password not correct!'})
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(400).send({error: 'Username or password not correct!'})
    }
    user.generateToken();
    await user.save();
    return res.send(user)
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Success'};
    try {
        const token = req.get('Authorization');
        if (!token) return res.send(success);
        const user = await User.findOne({token});
        if (!user) return res.send(success);
        user.generateToken();
        await user.save();
        return res.send(success)
    } catch (e) {
        return res.send(success)
    }
});

module.exports = router;
