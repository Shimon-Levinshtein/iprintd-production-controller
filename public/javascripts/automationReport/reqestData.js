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

                    let automatic = 0;
                    let test = 0;
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
                            automatic = automatic + 1;
                            SwitchToAutomation++;
                            objLeftRepot[element.product].automatic++;
                            if (element.automationSucceeded == 'Succeeded') {
                                test = test + 1;
                                SucceededInAutomation++;
                                objLeftRepot[element.product].succeeded++;
                            }
                            if (element.automationSucceeded == 'Fails') {
                                test = test + 1;
                                FailedToAutomate++
                                objLeftRepot[element.product].fails++;
                            };
                            if (element.automationSucceeded == 'Did not reach Ultimate' || element.automationSucceeded == 'No file found in imposd folder' || element.automationSucceeded == '0' || element.automationSucceeded == '') {
                                test = test + 1;
                                ThereWasAutomationAndDidNotGoThroughAutomation++
                                objLeftRepot[element.product].didNotPass++;
                            };
                        }

                        if (element.automationStatus == 'Manual' || element.automationStatus == '0' ) {
                            manual++;
                            objLeftRepot[element.product].manual++;
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
                    let liLeft = `<li class="automationReportScreen-left-li-poduct">
                        <h3>מק''ט </h3>
                        <h4>אוטומטי</h4>
                        <h4>ידני</h4>
                        <h4>הצליח</h4>
                        <h4>נכשל</h4>
                        <h4>לא עבר</h4>
                        </li>`
                    
                    for (const property in objLeftRepot) {
                        liLeft += `<li class="automationReportScreen-left-li-poduct">
                        <h3>${property}: </h3>
                        <h4> ${objLeftRepot[property].automatic}</h4>
                        <h4> ${objLeftRepot[property].manual}</h4>
                        <h4> ${objLeftRepot[property].succeeded}</h4>
                        <h4> ${objLeftRepot[property].fails}</h4>
                        <h4> ${objLeftRepot[property].didNotPass}</h4>
                        </li>`
                    }

                    

                    // let QuantityOrdersPercentages = 0;
                    let SwitchToAutomationPercentages = (SwitchToAutomation / QuantityOrders) * 100;
                    let SucceededInAutomationPercentages = (SucceededInAutomation / QuantityOrders) * 100;
                    let FailedToAutomatePercentages = (FailedToAutomate / QuantityOrders) * 100;
                    let ThereWasAutomationAndDidNotGoThroughAutomationPercentages = (ThereWasAutomationAndDidNotGoThroughAutomation / QuantityOrders) * 100;
                    let manualPercentages = (manual / QuantityOrders) * 100;


                    let svg = `<svg height="20" width="20" viewBox="0 0 20 20">
                    <circle r="10" cx="10" cy="10" fill="red" />
                    <circle r="5" cx="10" cy="10" fill="transparent"
                            stroke="blue"
                            stroke-width="10"
                            stroke-dasharray="calc(${SwitchToAutomationPercentages} * 31.4 / 100) 31.4"
                            transform="rotate(-90) translate(-20)" />
                    <circle r="5" cx="10" cy="10" fill="transparent"
                            stroke="orange"
                            stroke-width="10"
                            stroke-dasharray="calc(${FailedToAutomatePercentages + ThereWasAutomationAndDidNotGoThroughAutomationPercentages} * 31.4 / 100) 31.4"
                            transform="rotate(-90) translate(-20)" />
                    <circle r="5" cx="10" cy="10" fill="transparent"
                            stroke="yellow"
                            stroke-width="10"
                            stroke-dasharray="calc(${FailedToAutomatePercentages } * 31.4 / 100) 31.4"
                            transform="rotate(-90) translate(-20)" />
                  </svg>`

                  let percent = `<div class="automationReportScreen-Color-detail-in-percent">
                  <div class="automationReportScreen-Color-detail-in-percent-point-contining">
                    <p class="automationReportScreen-Color-detail-in-percent-text-percent">${manualPercentages.toFixed(1)}%</p>
                    <div class="automationReportScreen-Color-detail-in-percent-point" style="background-color: red;"></div>
                    <p class="automationReportScreen-Color-detail-in-percent-text">ידני</p>
                  </div>
                  <div class="automationReportScreen-Color-detail-in-percent-point-contining">
                    <p class="automationReportScreen-Color-detail-in-percent-text-percent">${SucceededInAutomationPercentages.toFixed(1)}%</p>
                    <div class="automationReportScreen-Color-detail-in-percent-point" style="background-color: blue;"></div>
                    <p class="automationReportScreen-Color-detail-in-percent-text">הצליחה באוטומציה</p>
                  </div>
                  <div class="automationReportScreen-Color-detail-in-percent-point-contining">
                    <p class="automationReportScreen-Color-detail-in-percent-text-percent">${ThereWasAutomationAndDidNotGoThroughAutomationPercentages.toFixed(1)}%</p>
                    <div class="automationReportScreen-Color-detail-in-percent-point" style="background-color: orange;"></div>
                    <p class="automationReportScreen-Color-detail-in-percent-text">נפל לפני האוטומציה</p>
                  </div>
                  <div class="automationReportScreen-Color-detail-in-percent-point-contining">
                    <p class="automationReportScreen-Color-detail-in-percent-text-percent">${FailedToAutomatePercentages.toFixed(1)}%</p>
                    <div class="automationReportScreen-Color-detail-in-percent-point" style="background-color: yellow;"></div>
                    <p class="automationReportScreen-Color-detail-in-percent-text">נכשל באוטומציה</p>
                  </div>
                </div>`

                    const ulLeft = `<ul class="automationReportScreen-left-ul-report">${liLeft}</ul>`;
                    res({ ulRedyRight, ulLeft, svg, percent })
                });
        });
    }

}

const reqestData = new ReqestData();

module.exports = reqestData;


