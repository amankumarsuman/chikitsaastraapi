const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Add this line
dotenv.config();
connectDB();

const app = express();
// Use CORS middleware
app.use(cors()); // Add this line
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/labs', require('./routes/labRoutes'));
app.use('/api/pharmacies', require('./routes/pharmacyRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
