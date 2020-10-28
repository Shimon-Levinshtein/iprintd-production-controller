const Sequelize = require('sequelize'); 
const sequelize = require('./sequelize');

exports.OrdersCount = sequelize.define('Orders_count' , {
   id:{
       type: Sequelize.INTEGER,
       allowNull: false,
       autoIncrement: true,
       primaryKey: true
   },
   numbrOrder:{
       type: Sequelize.TEXT
   },
   numbrOrderAndIitem:{
       type: Sequelize.TEXT
   },
   itemID:{
       type: Sequelize.TEXT
   },
   product: {
       type: Sequelize.TEXT
   },
   cprofNum: {
       type: Sequelize.TEXT
   },
   doerName: {
       type: Sequelize.TEXT
   },
   salesAgent: {
       type: Sequelize.TEXT
   },
});

// exports.controlr_buttons = sequelize.define('???????' , {
//    id:{
//        type: Sequelize.INTEGER,
//        allowNull: false,
//        autoIncrement: true,
//        primaryKey: true
//    },
//    button_name:{
//        type: Sequelize.STRING
//    },
//    On_Off: {
//        type: Sequelize.TEXT
//    },
//    class: {
//        type: Sequelize.TEXT
//    },
// });