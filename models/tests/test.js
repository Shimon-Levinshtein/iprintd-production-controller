const { timeStamp } = require("console");
const fs = require("fs");
const parseString = require('xml2js').parseString;

const allOrders = require('../../mySql/all_orders');
const automationSql = require('../../mySql/automation');
const allOrdersData = require('../../mySql/all_orders');
const fildData = require('../automationReport/fildData');




class test {
    constructor() {

    }

    async test() {
        let count = 0;
        let countTime = 10;
        const arr = [];
        await automationSql.automationData.findAll({})
            .then(order => {
                order.forEach(element => {
                    arr.push(element.numbrOrderAndIitem);
                })
            })
        allOrdersData.AllOrders.findAll({})
            .then(order => {
                order.forEach(element => {
                    if (!arr.includes(element.numbrOrderAndIitem)) {
                        setTimeout(function(){ 
                            fildData.fildDataByOrder(element.numbrOrderAndIitem);
                         }, countTime);
                        countTime = countTime + 10;
                        count ++;
                        console.log(count);
                    }
                })
            })

    };



};

module.exports = new test();
