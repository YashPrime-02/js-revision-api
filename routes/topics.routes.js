const express = require('express');

const router = express.Router();

const {
    getAllTopics,
    getSingleTopic
} = require('../controllers/topics.controller');

router.get('/', getAllTopics);

router.get('/:topicId', getSingleTopic);

module.exports = router;