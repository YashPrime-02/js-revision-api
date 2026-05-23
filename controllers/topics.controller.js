const path = require('path');
const fs = require('fs');


// ==========================================
// GET ALL TOPICS
// ==========================================

const getAllTopics = (req, res) => {

    try {

        const topicsPath = path.join(
            __dirname,
            '../data/topics.json'
        );

        const topics = JSON.parse(
            fs.readFileSync(topicsPath, 'utf-8')
        );

        res.status(200).json({
            success: true,
            totalTopics: topics.length,
            data: topics
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Failed to fetch topics',
            error: error.message
        });
    }
};



// ==========================================
// GET SINGLE TOPIC
// ==========================================

const getSingleTopic = (req, res) => {

    try {

        const { topicId } = req.params;

        const topicPath = path.join(
            __dirname,
            `../data/${topicId}.json`
        );


        // CHECK FILE EXISTS
        if (!fs.existsSync(topicPath)) {

            return res.status(404).json({
                success: false,
                message: `Topic '${topicId}' not found`
            });
        }


        // READ JSON FILE
        const topicData = JSON.parse(
            fs.readFileSync(topicPath, 'utf-8')
        );


        res.status(200).json({
            success: true,
            data: topicData
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Failed to fetch topic',
            error: error.message
        });
    }
};



// ==========================================
// EXPORTS
// ==========================================

module.exports = {
    getAllTopics,
    getSingleTopic
};