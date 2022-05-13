import Sequelize  from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
});


(async()=>{
    try {
        await sequelize.sync({ force: false });
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();

export default sequelize;