module.exports = (sequelize, Sequelize) => {
  const Supporter = sequelize.define("supporter", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    registrationNumber: {
      type: Sequelize.STRING(50),
      unique: true,
      allowNull: false
    },
    fullName: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    business: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    state: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    LG: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    ward: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    pollingUnit: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    photoUrl: {
      type: Sequelize.STRING(500),
      allowNull: true
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'supporters',
    timestamps: true
  });

  return Supporter;
};
