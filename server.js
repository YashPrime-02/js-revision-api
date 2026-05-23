require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

const topicsRoutes = require('./routes/topics.routes');


// ==========================================
// MIDDLEWARES
// ==========================================

// Security Headers
app.use(helmet());

// Enable CORS
app.use(cors());

// JSON Parser
app.use(express.json());

// HTTP Request Logger
app.use(morgan('dev'));


// ==========================================
// RATE LIMITER
// ==========================================

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 100,
    message: {
        success: false,
        message: 'Too many requests, please try again later'
    }
});

app.use(limiter);


// ==========================================
// ROUTES
// ==========================================

app.use('/api/topics', topicsRoutes);


// ==========================================
// HOME ROUTE
// ==========================================

app.get('/', (req, res) => {

    res.send(`
    
    <!DOCTYPE html>
    <html lang="en">

    <head>

        <meta charset="UTF-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>JS Revision API</title>

        <style>

            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
                font-family:Arial, sans-serif;
            }

            body{
                background:#0f172a;
                color:white;
                min-height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
                padding:30px;
            }

            .container{
                width:100%;
                max-width:900px;
                background:#111827;
                border:1px solid #1e293b;
                border-radius:20px;
                padding:40px;
                box-shadow:0 10px 40px rgba(0,0,0,0.5);
            }

            h1{
                font-size:48px;
                margin-bottom:10px;
                color:#38bdf8;
            }

            p{
                color:#cbd5e1;
                margin-bottom:20px;
                line-height:1.6;
            }

            .badge{
                display:inline-block;
                background:#1e293b;
                padding:8px 14px;
                border-radius:999px;
                font-size:14px;
                margin-bottom:30px;
                color:#38bdf8;
            }

            .section{
                margin-top:30px;
            }

            .section h2{
                margin-bottom:15px;
                color:#f8fafc;
            }

            .card{
                background:#0f172a;
                border:1px solid #1e293b;
                padding:20px;
                border-radius:14px;
                margin-bottom:15px;
                transition:0.3s;
            }

            .card:hover{
                transform:translateY(-4px);
                border-color:#38bdf8;
            }

            a{
                text-decoration:none;
                color:#38bdf8;
                font-weight:bold;
            }

            code{
                color:#22c55e;
                font-size:15px;
            }

            footer{
                margin-top:40px;
                color:#64748b;
                font-size:14px;
                text-align:center;
            }

        </style>

    </head>

    <body>

        <div class="container">

            <span class="badge">
                Version 1.0.0
            </span>

            <h1>JS Revision API 🚀</h1>

            <p>
                Professional JavaScript learning API built with Node.js and Express.
                Explore JavaScript topics, concepts, functions, scope, control flow and more.
            </p>

            <div class="section">

                <h2>Available Endpoints</h2>

                <div class="card">
                    <p>
                        <code>GET /api/topics</code>
                    </p>

                    <a href="/api/topics">
                        View All Topics
                    </a>
                </div>

                <div class="card">
                    <p>
                        <code>GET /api/topics/:topicId</code>
                    </p>

                    <a href="/api/topics/03_basics">
                        View Sample Topic
                    </a>
                </div>

            </div>

            <div class="section">

                <h2>Tech Stack</h2>

                <p>
                    Node.js • Express.js • Vercel • REST API
                </p>

            </div>

            <footer>
                Developed by Yash Mishra
            </footer>

        </div>

    </body>

    </html>

    `);

});


// ==========================================
// 404 ROUTE HANDLER
// ==========================================

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: 'Route not found'
    });

});


// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});