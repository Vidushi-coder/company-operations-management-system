require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Connecting to the database
connectDB();

const app = express();

console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    "http://localhost:4173",
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Company Operations Management System API is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});