const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

exports.automationData = sequelize.define('automationData', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    numbrOrder: {
        type: Sequelize.TEXT
    },
    numbrOrderAndIitem: {
        type: Sequelize.TEXT
    },
    itemID: {
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
    arrWitTheProperties: {
        type: Sequelize.JSON
    },
    WhenDidTheOrderArrive: {
        type: Sequelize.DATE
    },
    // automation
    automationStatus: {
        type: Sequelize.TEXT
    },
    automationSucceeded: {
        type: Sequelize.TEXT
    },
    hotFolderAutomation: {
        type: Sequelize.TEXT
    },
    whichTempleUse: {
        type: Sequelize.TEXT
    },
    errorMessage: {
        type: Sequelize.TEXT
    },
    HowMuchShouldHaveBeenPutOnPage: {
        type: Sequelize.JSON
    },
    whatTemplateShouldHaveBeenPutTogether: {
        type: Sequelize.JSON
    },
});