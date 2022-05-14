import {Sequelize, DataTypes}  from "sequelize";
import User from "./User.js"
const sequelize = new Sequelize('sqlite::memory:');

const Post = sequelize.define('Post', 
  {
    // Model attributes are defined here
    // date: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: false
    // },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    arthur: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }, 
);
User.hasMany(Post, {
  foreignKey: "email"
});
Post.belongsTo(User);

export default Post;