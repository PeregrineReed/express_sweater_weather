'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT
  }, {});
  City.associate = function(m) {
    City.belongsToMany(m.User, {through: m.UserCity, foreignKey: m.CityId})
  };
  return City;
};
