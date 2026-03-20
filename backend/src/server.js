import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/auth.js';
import plantRoutes from './routes/plants.js';
import favoriteRoutes from './routes/favorites.js';
import userRoutes from './routes/users.js';
import gardenRoutes from './routes/gardens.js';
import plannerRoutes from './routes/planner.js';
import careTrackerRoutes from './routes/careTracker.js';
import learningRoutes from './routes/learning.js';
import encyclopediaRoutes from './routes/encyclopedia.js';
import quizRoutes from './routes/quizzes.js';
import videoRoutes from './routes/videos.js';
import models3dRoutes from './routes/models3d.js';
import progressRoutes from './routes/progress.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Parse allowed origins from environment variable
const getAllowedOrigins = () => {
  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
  if (!allowedOriginsEnv) return [];
  return allowedOriginsEnv.split(',').map(url => url.trim());
};

const allowedOrigins = getAllowedOrigins();

// Dynamic CORS configuration to handle localhost and production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl requests, Render health checks)
    if (!origin) return callback(null, true);
    
    // Development: Allow localhost on any port
    if (process.env.NODE_ENV === 'development') {
      if (origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('192.168')) {
        return callback(null, true);
      }
    }
    
    // Production: Check against ALLOWED_ORIGINS environment variable
    if (allowedOrigins.length > 0 && allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // If origin not allowed in production
    if (allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) {
      return callback(new Error('Not allowed by CORS'));
    }
    
    // Fallback: allow for development
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400
};

// Apply CORS middleware FIRST, before all routes
app.use(cors(corsOptions));

// Explicit preflight handler
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/gardens', gardenRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/care-tracker', careTrackerRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/encyclopedia', encyclopediaRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/models3d', models3dRoutes);
app.use('/api/progress', progressRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Herbal Garden Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      plants: '/api/plants',
      favorites: '/api/favorites',
      users: '/api/users'
    }
  });
});

// 404 handler
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Start server with automatic port fallback
let currentPort = PORT;
let portRetries = 0;
const maxPortRetries = 5;
const basePort = parseInt(PORT);
const allowedPorts = [basePort, basePort + 1, basePort + 100, basePort + 1000, 3000, 3001];

const startServer = () => {
  if (portRetries >= allowedPorts.length) {
    console.error('❌ Could not find an available port. All ports attempted are in use.');
    console.error('Available ports tried:', allowedPorts.join(', '));
    process.exit(1);
  }

  currentPort = allowedPorts[portRetries];

  const server = app.listen(currentPort, '0.0.0.0', () => {
    console.log(`
╔════════════════════════════════════════╗
║   Herbal Garden Backend API           ║
║   Server running on port ${currentPort}           ║
║   Environment: ${process.env.NODE_ENV || 'development'}       ║
╚════════════════════════════════════════╝
    `);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${currentPort} in use, trying ${allowedPorts[portRetries + 1] || 'next...'}...`);
      portRetries += 1;
      startServer();
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down...');
    server.close(() => process.exit(0));
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down...');
    server.close(() => process.exit(0));
  });
};

startServer();

export default app;
