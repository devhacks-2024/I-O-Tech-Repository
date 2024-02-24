const { Sequelize, DataTypes } = require('sequelize');

// 连接到数据库
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// 定义用户模型
const User = sequelize.define('User', {
  // 属性
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // 选项
});

module.exports = { sequelize, User };
