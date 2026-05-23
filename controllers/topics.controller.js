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

        const wantsHTML =
            req.headers.accept?.includes('text/html');


        // ==========================================
        // HTML RESPONSE
        // ==========================================

        if (wantsHTML) {

            const topicsHTML = topics.map(topic => {

                return `

                    <div class="card">

                        <div class="top">
                            <h2>${topic.title}</h2>
                            <span>${topic.difficulty}</span>
                        </div>

                        <p>${topic.description}</p>

                        <div class="tags">
                            ${topic.tags.map(tag =>
                                `<small>${tag}</small>`
                            ).join('')}
                        </div>

                        <a href="/api/topics/${topic.id}">
                            Open Topic →
                        </a>

                    </div>

                `;

            }).join('');


            return res.send(`

            <!DOCTYPE html>

            <html>

            <head>

                <title>All Topics</title>

                <style>

                    body{
                        background:#020617;
                        color:white;
                        font-family:Arial;
                        padding:40px;
                    }

                    .container{
                        max-width:1200px;
                        margin:auto;
                    }

                    h1{
                        font-size:50px;
                        margin-bottom:40px;
                        color:#38bdf8;
                    }

                    .grid{
                        display:grid;
                        grid-template-columns:
                        repeat(auto-fit,minmax(320px,1fr));
                        gap:25px;
                    }

                    .card{
                        background:#0f172a;
                        border:1px solid #1e293b;
                        border-radius:20px;
                        padding:25px;
                        transition:0.3s;
                    }

                    .card:hover{
                        transform:translateY(-5px);
                        border-color:#38bdf8;
                    }

                    .top{
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        margin-bottom:15px;
                    }

                    span{
                        background:#1e293b;
                        padding:6px 12px;
                        border-radius:999px;
                        color:#38bdf8;
                        font-size:12px;
                    }

                    p{
                        color:#94a3b8;
                        line-height:1.6;
                        margin-bottom:20px;
                    }

                    .tags{
                        display:flex;
                        flex-wrap:wrap;
                        gap:10px;
                        margin-bottom:20px;
                    }

                    small{
                        background:#111827;
                        border:1px solid #334155;
                        padding:6px 10px;
                        border-radius:999px;
                    }

                    a{
                        color:#38bdf8;
                        text-decoration:none;
                        font-weight:bold;
                    }

                </style>

            </head>

            <body>

                <div class="container">

                    <h1>
                        JavaScript Topics 🚀
                    </h1>

                    <div class="grid">

                        ${topicsHTML}

                    </div>

                </div>

            </body>

            </html>

            `);

        }


        // ==========================================
        // JSON RESPONSE
        // ==========================================

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