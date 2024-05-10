require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const stateRoutes = require('./src/routes/states'); 
const app = express();

app.use(express.json()); 
// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use state routes with the base path '/states'
app.use('/states', stateRoutes);

// Handle root route
app.get('/', (req, res) => {
  res.send('Welcome to the US States API!');
});

// Middleware to handle 404 (Not Found) errors
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Something broke!');
});

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


