module.exports = function(sequelize, DataTypes) {
    var Blog = sequelize.define("Blog", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: "Point of Interest"
      },
      location: {
        type: DataTypes.STRING,
        defaultValue: "USA"
      }
    });
    return Blog;
  };
  