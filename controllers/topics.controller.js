const path = require('path');


// GET ALL TOPICS
const getAllTopics = (req, res) => {

    const topics = require('../data/topics.json');

    res.json(topics);
};


// GET SINGLE TOPIC
const getSingleTopic = (req, res) => {

    try {

        const topicId = req.params.topicId;

        const filePath = path.join(
            __dirname,
            `../data/${topicId}.json`
        );

        const topicData = require(filePath);

        res.json(topicData);

    } catch (error) {

        res.status(404).json({
            success: false,
            message: 'Topic not found'
        });
    }
};

module.exports = {
    getAllTopics,
    getSingleTopic
};