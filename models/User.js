import {Sequelize, DataTypes}  from "sequelize";


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
});


const User = sequelize.define('User', {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }

});

  
export default User;