const db = require("../config/sequelize");
const Supporter = db.supporters;
const { Op } = require("sequelize");
const path = require('path');
const fs = require('fs');

// Generate unique registration number
const generateRegistrationNumber = () => {
  const prefix = "KWK";
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

// Register new supporter
exports.register = async (req, res) => {
  try {
    const {
      fullName,
      age,
      business,
      state,
      LG,
      ward,
      pollingUnit,
      phoneNumber,
      email
    } = req.body;

    // Validate required fields
    if (!fullName || !state || !LG || !ward || !pollingUnit || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Check for duplicate phone number
    const existing = await Supporter.findOne({ where: { phoneNumber } });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Phone number already registered",
        registrationNumber: existing.registrationNumber
      });
    }

    // Handle photo upload
    let photoUrl = null;
    if (req.files && req.files.photo) {
      const photo = req.files.photo;
      const fileName = `${Date.now()}_${photo.name}`;
      const uploadPath = path.join(__dirname, '../uploads', fileName);
      await photo.mv(uploadPath);
      photoUrl = `/uploads/${fileName}`;
    }

    // Generate registration number
    const registrationNumber = generateRegistrationNumber();

    // Create supporter
    const supporter = await Supporter.create({
      registrationNumber,
      fullName,
      age: age || null,
      business: business || null,
      state,
      LG,
      ward,
      pollingUnit,
      phoneNumber,
      email: email || null,
      photoUrl
    });

    res.status(201).json({
      success: true,
      message: "Supporter registered successfully",
      registrationNumber,
      data: supporter
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Error registering supporter",
      error: error.message
    });
  }
};

// Get supporter by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const supporter = await Supporter.findByPk(id);

    if (!supporter) {
      return res.status(404).json({
        success: false,
        message: "Supporter not found"
      });
    }

    res.status(200).json({
      success: true,
      data: supporter
    });
  } catch (error) {
    console.error("Get supporter error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching supporter",
      error: error.message
    });
  }
};

// Get all supporters with pagination and filters
exports.getAll = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      state = '',
      LG = ''
    } = req.query;

    const offset = (page - 1) * limit;

    // Build where clause
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { fullName: { [Op.like]: `%${search}%` } },
        { registrationNumber: { [Op.like]: `%${search}%` } },
        { phoneNumber: { [Op.like]: `%${search}%` } }
      ];
    }

    if (state) {
      whereClause.state = state;
    }

    if (LG) {
      whereClause.LG = LG;
    }

    const { count, rows } = await Supporter.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: {
        supporters: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error("Get supporters error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching supporters",
      error: error.message
    });
  }
};

// Verify supporter by registration number
exports.verify = async (req, res) => {
  try {
    const { registrationNumber } = req.params;

    const supporter = await Supporter.findOne({
      where: { registrationNumber }
    });

    if (!supporter) {
      return res.status(404).json({
        success: false,
        message: "Supporter not found"
      });
    }

    res.status(200).json({
      success: true,
      data: supporter
    });
  } catch (error) {
    console.error("Verify supporter error:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying supporter",
      error: error.message
    });
  }
};

// Get statistics
exports.getStatistics = async (req, res) => {
  try {
    const totalSupporters = await Supporter.count();


    // Get current time
    const now = new Date();

    // Today's registrations: from start of today to now
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayRegistrations = await Supporter.count({
      where: {
        createdAt: {
          [Op.gte]: startOfToday,
          [Op.lte]: now
        }
      }
    });

    // This week: from start of week (Sunday) to now
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const weekRegistrations = await Supporter.count({
      where: {
        createdAt: {
          [Op.gte]: startOfWeek,
          [Op.lte]: now
        }
      }
    });

    // This month: from start of month to now
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthRegistrations = await Supporter.count({
      where: {
        createdAt: {
          [Op.gte]: startOfMonth,
          [Op.lte]: now
        }
      }
    });

    res.status(200).json({
      success: true,
      data: {
        totalSupporters,
        todayRegistrations,
        weekRegistrations,
        monthRegistrations
      }
    });
  } catch (error) {
    console.error("Get statistics error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message
    });
  }
};

// Export to CSV
exports.exportCSV = async (req, res) => {
  try {
    const supporters = await Supporter.findAll({
      order: [['createdAt', 'DESC']]
    });

    // Create CSV content
    const headers = [
      'Registration Number',
      'Full Name',
      'Age',
      'Business',
      'State',
      'LG',
      'Ward',
      'Polling Unit',
      'Phone Number',
      'Email',
      'Registration Date'
    ];

    const csvRows = [headers.join(',')];

    supporters.forEach(supporter => {
      const row = [
        supporter.registrationNumber,
        `"${supporter.fullName}"`,
        supporter.age || '',
        supporter.business ? `"${supporter.business}"` : '',
        supporter.state,
        supporter.LG,
        supporter.ward,
        supporter.pollingUnit,
        supporter.phoneNumber,
        supporter.email || '',
        new Date(supporter.createdAt).toISOString().split('T')[0]
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=supporters.csv');
    res.status(200).send(csvContent);
  } catch (error) {
    console.error("Export CSV error:", error);
    res.status(500).json({
      success: false,
      message: "Error exporting CSV",
      error: error.message
    });
  }
};

exports.exportExcel = async (req, res) => {
  try {
    const supporters = await Supporter.findAll({
      order: [['createdAt', 'DESC']]
    });

    // Create Excel-compatible CSV with UTF-8 BOM for proper Excel import
    const headers = [
      'Registration Number',
      'Full Name',
      'Age',
      'Business',
      'State',
      'LG',
      'Ward',
      'Polling Unit',
      'Phone Number',
      'Email',
      'Registration Date'
    ];

    const csvRows = [headers.join(',')];

    supporters.forEach(supporter => {
      const row = [
        supporter.registrationNumber,
        `"${supporter.fullName.replace(/"/g, '""')}"`,
        supporter.age || '',
        supporter.business ? `"${supporter.business.replace(/"/g, '""')}"` : '',
        supporter.state,
        supporter.LG,
        supporter.ward,
        supporter.pollingUnit,
        supporter.phoneNumber,
        supporter.email || '',
        new Date(supporter.createdAt).toISOString().split('T')[0]
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = '\uFEFF' + csvRows.join('\n'); // Add BOM for Excel UTF-8 recognition

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=supporters.csv');
    res.status(200).send(csvContent);
  } catch (error) {
    console.error("Export Excel error:", error);
    res.status(500).json({
      success: false,
      message: "Error exporting to Excel",
      error: error.message
    });
  }
};
