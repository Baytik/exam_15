const express = require('express');
const router = express.Router();
const config = require('../config');
const path = require('path');
const {nanoid} = require('nanoid');
const multer = require('multer');

const Places = require('../models/Place');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});
const upload = multer({storage});

router.get('/', async (req, res) => {
    const places = await Places.find().populate('user');
    return res.send(places)
});

router.get('/:id', async (req, res) => {
    const place = await Places.findOne({_id: req.params.id});
    const view = place.views + req._eventsCount;
    place.views = view;
    await place.save();
    res.send(place)
});

router.post('/', upload.single('image'), auth, async (req, res) => {
    if (req.body.check === 'false') {
        return res.status(400).send({error: 'You did not accept the agreement'})
    }
    if (req.file) {
        req.body.image = req.file.filename;
    }

    const user = req.user;

    const object = {
        user: user._id,
        title: req.body.title,
        image: req.body.image,
        description: req.body.description
    };

    const place = new Places(object);

    try {
        await place.save();
        return res.send(place);
    } catch (error) {
        return res.status(400).send(error._message);
    }
});

router.post('/image', upload.single('images'), auth, async (req, res) => {
    if (req.file) {
        req.body.image = req.file.filename;
    }

    const place = await Places.findOne({_id: req.body.recipeId});

    place.images.push(req.body.image);
    try {
        await place.save();
        return res.send(place);
    } catch (error) {
        return res.status(400).send(error._message);
    }
});

router.post('/comment', auth, async (req, res) => {
    const place = await Places.findOne({_id: req.body.id});
    const user = req.user;
    const date = new Date();
    const postDate = date.toISOString();
    const comment = {
        comment: req.body.comment.comment,
        quality: req.body.comment.rate.quality,
        service: req.body.comment.rate.service,
        interior: req.body.comment.rate.interior,
        author: user.username,
        date: postDate
    };
    const rateArray = [0];
    const rateQuality = [0];
    const rateService = [0];
    const rateInterior = [0];
    place.comments.push(comment);
    place.comments.map(comment => {
        rateArray.push(comment.quality, comment.service, comment.interior);
        rateQuality.push(comment.quality);
        rateService.push(comment.service);
        rateInterior.push(comment.interior);
    });
    const amountRate = rateArray.reduce((amount, total) => amount + total);
    const QualityRate = rateQuality.reduce((amount, total) => amount + total);
    const ServiceRate = rateService.reduce((amount, total) => amount + total);
    const InteriorRate = rateInterior.reduce((amount, total) => amount + total);
    rateArray.shift();
    rateQuality.shift();
    rateService.shift();
    rateInterior.shift();
    const ratingDec = amountRate / rateArray.length;
    const ratingQuality = QualityRate / rateQuality.length;
    const ratingService = ServiceRate / rateService.length;
    const ratingInterior = InteriorRate / rateInterior.length;
    const rating = Math.floor(ratingDec * 10) / 10;
    const quality = Math.floor(ratingQuality * 10) / 10;
    const service = Math.floor(ratingService * 10) / 10;
    const interior = Math.floor(ratingInterior * 10) / 10;
    place.rating = rating;
    place.quality = quality;
    place.service = service;
    place.interior = interior;

    try {
        await place.save();
        res.send(place);
    } catch (error) {
        return res.status(400).send(error._message);
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    await Places.deleteOne({_id: req.params.id});

    try {
        return res.send({message: 'Was deleted'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/comment/:id/rate/:commentId', [auth, permit('admin')], async (req, res) => {
    const place = await Places.findOne({_id: req.params.id});
    const recipeIndex = place.comments.findIndex(comment => comment._id.toString() === req.params.commentId.toString());
    if (place.comments.length !== 1) {
        place.comments.splice(recipeIndex, 1);
        const rateArray = [0];
        const rateQuality = [0];
        const rateService = [0];
        const rateInterior = [0];
        place.comments.map(comment => {
            rateArray.push(comment.quality, comment.service, comment.interior);
            rateQuality.push(comment.quality);
            rateService.push(comment.service);
            rateInterior.push(comment.interior);
        });
        const amountRate = rateArray.reduce((amount, total) => amount + total);
        const QualityRate = rateQuality.reduce((amount, total) => amount + total);
        const ServiceRate = rateService.reduce((amount, total) => amount + total);
        const InteriorRate = rateInterior.reduce((amount, total) => amount + total);
        rateArray.shift();
        rateQuality.shift();
        rateService.shift();
        rateInterior.shift();
        const ratingDec = amountRate / rateArray.length;
        const ratingQuality = QualityRate / rateQuality.length;
        const ratingService = ServiceRate / rateService.length;
        const ratingInterior = InteriorRate / rateInterior.length;
        const rating = Math.floor(ratingDec * 10) / 10;
        const quality = Math.floor(ratingQuality * 10) / 10;
        const service = Math.floor(ratingService * 10) / 10;
        const interior = Math.floor(ratingInterior * 10) / 10;
        place.rating = rating;
        place.quality = quality;
        place.service = service;
        place.interior = interior;
    } else {
        place.comments.splice(recipeIndex, 1);
        place.rating = 0;
        place.quality = 0;
        place.service = 0;
        place.interior = 0;
    }
    try {
        await place.save();
        return res.send({message: 'Was deleted'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/place/:id/image/:image', [auth, permit('admin')], async (req, res) => {
    const place = await Places.findOne({_id: req.params.id});
    const placeIndex = place.images.findIndex(image => image === req.params.image);
    place.images.splice(placeIndex, 1);

    try {
        await place.save();
        return res.send(place);
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;