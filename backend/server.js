const express = require('express');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/sequelize");
const path = require('path');

// Database Configuration
db.sequelize.sync()
  .then(() => {
    console.log("✓ Database synced successfully");
  })
  .catch((err) => {
    console.log("✗ Failed to sync database: " + err.message);
  });

// Middleware setup
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(fileUpload({
  createParentPath: true,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  },
  abortOnLimit: true
}));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/generated', express.static(path.join(__dirname, 'generated')));
// Serve logo from backend root
app.use('/logo.jpeg', express.static(path.join(__dirname, 'logo.jpeg')));

// Routes
const supporterRoutes = require('./routes/supporterRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminRegisterRoutes = require('./routes/adminRegisterRoutes');

app.use('/api/supporters', supporterRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', adminRegisterRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Kwankwasiyya Digital ID System API",
    version: "1.0.0",
    endpoints: {
      supporters: "/api/supporters",
      pdf: "/api/pdf",
      analytics: "/api/analytics"
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// 404 Error Handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    error: {
      statusCode: 404,
      message: "The requested endpoint does not exist"
    }
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error: {
      statusCode: err.status || 500,
      message: err.message
    }
  });
});

// Server Initialization
const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`\n🚀 Kwankwasiyya Digital ID System API`);
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n✓ Ready to accept requests\n`);
});

module.exports = app;
