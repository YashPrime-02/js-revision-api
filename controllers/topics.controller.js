const path = require('path');
const fs = require('fs');


// ==========================================
// READ JSON FILE HELPER
// ==========================================

const readJsonFile = (filePath) => {

    const data = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(data);
};


// ==========================================
// GET ALL TOPICS
// ==========================================

const getAllTopics = (req, res) => {

    try {

        const topicsPath = path.join(
            __dirname,
            '../data/topics.json'
        );

        const topics = readJsonFile(topicsPath);

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


        // FILE EXISTS CHECK
        if (!fs.existsSync(topicPath)) {

            return res.status(404).json({
                success: false,
                message: `Topic '${topicId}' not found`
            });
        }


        const topicData = readJsonFile(topicPath);

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