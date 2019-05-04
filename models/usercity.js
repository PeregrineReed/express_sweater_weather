'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCity = sequelize.define('UserCity', {
    UserId: DataTypes.INTEGER,
    CityId: DataTypes.INTEGER
  }, {});
  UserCity.associate = function(models) {
    // associations can be defined here
  };
  return UserCity;
};