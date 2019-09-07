module.exports = function(sequelize, DataTypes) {
    var Flashcard = sequelize.define("Flashcard", {
      question: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      subject: {
        type: DataTypes.STRING,
        defaultValue: "English"
      }
    });
    return Flashcard;
  };
  