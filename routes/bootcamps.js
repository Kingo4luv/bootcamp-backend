const express = require('express');
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middlewares/advancedResults');
const {
    protect,
    authorize
} = require('../middlewares/auth');

// Include other resources routers
const courseRouter = require('./courses');
const router = express.Router();


// Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter);


router.route('/').get(advancedResults(Bootcamp, 'courses'), getBootcamps).post(protect, authorize('publisher', 'admin'), createBootcamp);
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(protect, authorize('publisher', 'admin'), deleteBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);



module.exports = router;