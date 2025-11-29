const db = require("../config/sequelize");
const Supporter = db.supporters;
const { Op } = require("sequelize");

// Get registration trends
exports.getRegistrationTrends = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const supporters = await Supporter.findAll({
      where: {
        createdAt: {
          [Op.gte]: startDate
        }
      },
      attributes: [
        [db.sequelize.fn('DATE', db.sequelize.col('createdAt')), 'date'],
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
      ],
      group: [db.sequelize.fn('DATE', db.sequelize.col('createdAt'))],
      order: [[db.sequelize.fn('DATE', db.sequelize.col('createdAt')), 'ASC']]
    });

    res.status(200).json({
      success: true,
      data: supporters
    });
  } catch (error) {
    console.error("Get registration trends error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching registration trends",
      error: error.message
    });
  }
};

// Get supporters by state
exports.getSupportersByState = async (req, res) => {
  try {
    const supporters = await Supporter.findAll({
      attributes: [
        'state',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
      ],
      group: ['state'],
      order: [[db.sequelize.fn('COUNT', db.sequelize.col('id')), 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: supporters
    });
  } catch (error) {
    console.error("Get supporters by state error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching supporters by state",
      error: error.message
    });
  }
};

// Get supporters by LG
exports.getSupportersByLG = async (req, res) => {
  try {
    const supporters = await Supporter.findAll({
      attributes: [
        'LG',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
      ],
      group: ['LG'],
      order: [[db.sequelize.fn('COUNT', db.sequelize.col('id')), 'DESC']],
      limit: 10
    });

    res.status(200).json({
      success: true,
      data: supporters
    });
  } catch (error) {
    console.error("Get supporters by LG error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching supporters by LG",
      error: error.message
    });
  }
};

// Get key metrics
exports.getKeyMetrics = async (req, res) => {
  try {
    const totalSupporters = await Supporter.count();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dailyRegistrations = await Supporter.count({
      where: {
        createdAt: {
          [Op.gte]: today
        }
      }
    });

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weeklyRegistrations = await Supporter.count({
      where: {
        createdAt: {
          [Op.gte]: weekAgo
        }
      }
    });

    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    
    const monthlyRegistrations = await Supporter.count({
      where: {
        createdAt: {
          [Op.gte]: monthAgo
        }
      }
    });

    res.status(200).json({
      success: true,
      data: {
        totalSupporters,
        dailyRegistrations,
        weeklyRegistrations,
        monthlyRegistrations
      }
    });
  } catch (error) {
    console.error("Get key metrics error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching key metrics",
      error: error.message
    });
  }
};
