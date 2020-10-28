const Sequelize = require('sequelize'); 
const sequelize = require('./sequelize');

exports.Tesks = sequelize.define('tesk' , {
   id:{
       type: Sequelize.INTEGER,
       allowNull: false,
       autoIncrement: true,
       primaryKey: true
   },
   tesk:{
       type: Sequelize.STRING
   },
   class: {
       type: Sequelize.TEXT
   },
});

exports.controlr_buttons = sequelize.define('Bcontrolr_button' , {
   id:{
       type: Sequelize.INTEGER,
       allowNull: false,
       autoIncrement: true,
       primaryKey: true
   },
   button_name:{
       type: Sequelize.STRING
   },
   On_Off: {
       type: Sequelize.TEXT
   },
   class: {
       type: Sequelize.TEXT
   },
});