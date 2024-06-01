const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const userRoutes = require('./Routes/UserRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});