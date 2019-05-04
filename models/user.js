'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    apiKey: DataTypes.STRING
  },
  {
    instanceMethods: {
      getCities: function() {
        User.associations.Cities.findAll({    
          include: [{
            model: UserCity,
            where: { UserId: this.id }
          }]
        }).then(favorites => {
          return favorites;
        }).catch(error => {
          return error;
        })
      }
    }
  });
  User.associate = function(m) {
    User.belongsToMany(m.City, {through: m.UserCity, foreignKey: m.UserId})
  };
  return User;
};
