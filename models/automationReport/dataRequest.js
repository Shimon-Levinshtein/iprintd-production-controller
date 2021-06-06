const fs = require("fs");
const { Op } = require('sequelize')
const moment = require('moment');
const { Promise } = require("mongoose");

const allOrders = require('../../mySql/all_orders');
const automationSql = require('../../mySql/automation');



class dataRequest {
    constructor() {

    }

    requestDataByDaysBack(numDays) {
        return new Promise((resolve, reject) => {


            automationSql.automationData.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: moment().subtract(numDays, 'days').toDate()
                    }
                }
            })
            .then(ordersAuto => {
                resolve(ordersAuto);
                    
            }).catch(err => {
                console.log(err);
            });
        });
    };




};

module.exports = new dataRequest();
