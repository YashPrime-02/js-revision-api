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

    res.status(200).json({
        success: true,
        message: 'Welcome to JS Revision API 🚀',
        version: '1.0.0',
        developer: 'Yash Mishra',
        endpoints: {
            allTopics: '/api/topics',
            singleTopic: '/api/topics/:topicId'
        },
        documentation: 'API for learning JavaScript concepts'
    });

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