import {Sequelize, DataTypes}  from "sequelize";

const sequelize = new Sequelize('sqlite::memory:');

const Post = sequelize.define('Post', {
    // Model attributes are defined here
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    arthur: {
      type: DataTypes.STRING,
      allowNull: false
    }

}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});