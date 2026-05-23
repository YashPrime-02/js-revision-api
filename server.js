require('dotenv').config();

const express = require('express');

const app = express();

const topicsRoutes = require('./routes/topics.routes');

app.use(express.json());

app.use('/api/topics', topicsRoutes);

// Home Route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'JS Revision API is running'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});