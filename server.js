const express = require('express');

const app = express();

const topicsRoutes = require('./routes/topics.routes');

app.use(express.json());

app.use('/api/topics', topicsRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});