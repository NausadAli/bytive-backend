const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/task.routes');
const healthRoutes = require('./routes/health.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB using better Try-catch
(async () => {
   try {
     await mongoose.connect(process.env.MONGO_URI, {
       dbName: 'tasks-bytive', // Specify the database name
     });
     console.log('Connected to MongoDB');
   } catch (err) {
     console.error('Error connecting to MongoDB:', err);
   }
 })();

 // Routes
app.use('/api/tasks', taskRoutes);  //all the task route
app.use('/api/health', healthRoutes);     //for health check of the api


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});