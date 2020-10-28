const Sequelize = require('sequelize'); 

const sequelinze = new Sequelize('2_controlr_fils' , 'root' , 'mysql' ,{
    dialect: 'mysql',
    host:'localhost'
})

module.exports = sequelinze;
