const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;

// 🔐 Middleware
app.use(cors());
app.use(express.json());

// 🔗 Routes
app.use('/api/todos', todoRoutes);

// 🌐 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)

.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
