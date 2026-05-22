const express = require('express');

const router = express.Router();

const {
    getAllTopics,
    getSingleTopic
} = require('../controllers/topics.controller');


// ==========================================
// GET ALL TOPICS
// ==========================================

router.get('/', getAllTopics);


// ==========================================
// GET SINGLE TOPIC
// ==========================================

router.get('/:topicId', getSingleTopic);


module.exports = router;