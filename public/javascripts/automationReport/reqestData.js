const automationSequelize = require('../../../mySql/automation');
const { Op } = require('sequelize')
const moment = require('moment');


class ReqestData {
    constructor() { }


    ulReportByDays(daysReport) {
        return new Promise(function (res, rej) {
            let ulRedyRight = ``;
            automationSequelize.automationData.findAll({
                where: {
                    WhenDidTheOrderArrive: {
                        [Op.gte]: moment().subtract(daysReport, 'days').toDate()
                    }
                }
            })
                .then(result => {
                    const objLeftRepot = {};
                    let QuantityOrders = 0;
                    let SwitchToAutomation = 0;
                    let SucceededInAutomation = 0;
                    let FailedToAutomate = 0;
                    let ThereWasAutomationAndDidNotGoThroughAutomation = 0;
                    let manual = 0;
                    result.forEach(element => {
                        if (!objLeftRepot[element.product]) {
                            objLeftRepot[element.product] = {
                                automatic: 0,
                                manual: 0,
                                succeeded: 0,
                                fails: 0,
                                didNotPass: 0,
                            };
                        }
                        QuantityOrders++;
                        if (element.automationStatus == 'Automatic') {
                            SwitchToAutomation++;
                            objLeftRepot[element.product].automatic++;
                            if (element.automationSucceeded == 'Succeeded') {
                                SucceededInAutomation++;
                                objLeftRepot[element.product].succeeded++;
                            }
                            if (element.automationSucceeded == 'Fails') {
                                FailedToAutomate++
                                objLeftRepot[element.product].fails++;
                            };
                        }
                        if (element.automationStatus == 'Manual' || element.automationStatus == '0') {
                            manual++;
                            objLeftRepot[element.product].manual++;
                        };
                        if (element.automationSucceeded == 'Did not reach Ultimate' || element.automationSucceeded == '0') {
                            ThereWasAutomationAndDidNotGoThroughAutomation++
                            objLeftRepot[element.product].didNotPass++;
                        };


                    });
                    ulRedyRight = `
                            <ul class="automationReportScreen-right-ul-report">
                            <li>
                            <H4>כמות סעיפים: ${QuantityOrders}</H4>
                            </li>
                            <li>
                            <H4>כמות סעיפים שעברו באוטומציה: ${SwitchToAutomation}</H4>
                            </li>
                            <li>
                            <H4>כמות סעיפים שהצליחו באוטומציה: ${SucceededInAutomation}</H4>
                            </li>
                            <li>
                            <H4>כמות הסעיפים שנכשלו באוטומציה: ${FailedToAutomate}</H4>
                            </li>
                            <li>
                            <H4>כמות הסעיפים שלא נכנסו לאוטומציה: ${ThereWasAutomationAndDidNotGoThroughAutomation}</H4>
                            </li>
                            <li>
                            <H4>כמות הסעיפים שעברו ידני: ${manual}</H4>
                            </li>
                            </ul>
                            `;
                    let liLeft = ``
                    for (const property in objLeftRepot) {
                        liLeft += `<li class="automationReportScreen-left-li-poduct">
                        <h3>${property}: </h3>
                        <h4>אוטומטי: ${objLeftRepot[property].automatic}</h4>
                        <h4>ידני: ${objLeftRepot[property].manual}</h4>
                        <h4>הצליח: ${objLeftRepot[property].succeeded}</h4>
                        <h4>נכשל: ${objLeftRepot[property].fails}</h4>
                        <h4>לא עבר: ${objLeftRepot[property].didNotPass}</h4>
                        </li>`
                    }
                    // automatic: 0,
                    // manual: 0,
                    // succeeded: 0,
                    // fails: 0,
                    // didNotPass: 0,

                    const ulLeft = `<ul class="automationReportScreen-left-ul-report">${liLeft}</ul>`;
                    res({ ulRedyRight, ulLeft })
                });
        });
    }

}

const reqestData = new ReqestData();

module.exports = reqestData;


