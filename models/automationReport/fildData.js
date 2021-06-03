const fs = require("fs");

const allOrders = require('../../mySql/all_orders');
const automationSql = require('../../mySql/automation');



class fildData {
    constructor() {

    }

    async fildDataByOrder(numOrder) {
        const newObj = {
            numbrOrder: false,
            numbrOrderAndIitem: false,
            itemID: false,
            product: false,
            cprofNum: false,
            doerName: false,
            salesAgent: false,
            arrWitTheProperties: false,
            WhenDidTheOrderArrive: false,
            automationStatus: false,
            automationSucceeded: false,
            hotFolderAutomation: false,
            whichTempleUse: false,
            errorMessage: false,
            HowMuchShouldHaveBeenPutOnPage: JSON.stringify({}),
            whatTemplateShouldHaveBeenPutTogether: JSON.stringify({}),
        }
        await automationSql.automationData.findOne({
            where: { numbrOrderAndIitem: numOrder },
        }).then(orderAuto => {
            if (!orderAuto) {
                allOrders.AllOrders.findOne({
                    where: { numbrOrderAndIitem: numOrder },
                }).then(async element => {
                    console.log(element);
                    // if (!element) {
                    const parameters = JSON.parse(element.arrWitTheProperties);

                    newObj.numbrOrder = element.numbrOrder;
                    newObj.numbrOrderAndIitem = element.numbrOrderAndIitem;
                    newObj.itemID = element.itemID;
                    newObj.product = element.product;
                    newObj.cprofNum = element.cprofNum;
                    newObj.doerName = element.doerName;
                    newObj.salesAgent = element.salesAgent;
                    newObj.arrWitTheProperties = element.arrWitTheProperties;
                    newObj.WhenDidTheOrderArrive = element.orderDate;
                    if (parameters.Prepress[0]) {
                        newObj.automationStatus = parameters.Prepress[0];
                        if (parameters.Prepress[0] == 'Automatic') {
                            await this.automationSuccessTest(element.itemID, element.numbrOrder)
                                .then(objResult => {
                                    newObj.automationSucceeded = objResult.automationSucceeded;
                                    newObj.hotFolderAutomation = objResult.hotFolderAutomation;
                                    newObj.whichTempleUse = objResult.whichTempleUse;
                                    newObj.errorMessage = objResult.errorMessage;
                                    newObj.HowMuchShouldHaveBeenPutOnPage = JSON.stringify({});
                                    newObj.whatTemplateShouldHaveBeenPutTogether = JSON.stringify({});
                                })
                            // .catch(err => {
                            //     console.log('Error await this.automationSuccessTest(element.itemID, element.numbrOrder)');
                            //     console.log(err);
                            // });
                        }
                    }

                    automationSql.automationData.create(newObj)
                        .then(function (user) {
                            // you can now access the newly created user
                            console.log('success', user.toJSON());
                        })
                        .catch(function (err) {
                            // print the error details
                            console.log('Error automationSql.automationData.create');
                            console.log(err);
                        });
                    // }
                }).catch(err => {
                    console.log('Error');
                    console.log(err);
                });

            }
        }).catch(err => {
            console.log('Error automationSql.automationData.findOne');
            console.log(err);
        });
    };

    automationSuccessTest(idOld, numbrOrderOld) {
        return new Promise((resolve, reject) => {

            console.log('automationSuccessTest ---->>>>');
            const objResult = {
                automationSucceeded: "",
                hotFolderAutomation: "",
                whichTempleUse: "",
                errorMessage: "",
                HowMuchShouldHaveBeenPutOnPage: JSON.stringify({}),
                whatTemplateShouldHaveBeenPutTogether: JSON.stringify({}),
            };

            const fun = (id, numbrOrder, Rounds) => {
                fs.readdir(`//Binaw//data//ProductionFiles//${numbrOrder}/${id * 1}/imposed`, (err, files) => {
                    if (files) {
                        if (files.length > 0) {
                            fs.readdir(`//172.16.0.11/Automation/XML/Input/Done`, (err, files) => {
                                console.log('**************************');
                                const XmlDone = [];
                                files.forEach(xmlFile => { XmlDone.push(xmlFile.slice(13, 26) + '-' + xmlFile.slice(32, 35)) });
                                if (XmlDone.includes(`${numbrOrder}-${id}`)) {
                                    objResult.automationSucceeded = 'Succeeded';
                                    resolve(objResult);
                                } else {
                                    fs.readdir(`//172.16.0.11/Automation/XML/Input/Error`, (err, filesErr) => {
                                        const XmlErr = [];
                                        filesErr.forEach(xmlFileErr => { XmlErr.push(xmlFileErr.slice(13, 26) + '-' + xmlFileErr.slice(32, 35)) });
                                        if (XmlErr.includes(`${numbrOrder}-${id}`)) {
                                            objResult.automationSucceeded = 'Fails';
                                            resolve(objResult);
                                        } else {
                                            objResult.automationSucceeded = 'Did not reach Ultimate';
                                            resolve(objResult);
                                        };
                                    });

                                }
                            });
                            // reject(objResult);
                        } else {
                            setTimeout(function () {
                                if (Rounds < 20) {
                                    // console.log('setTimeout: ------------->>>>>>>>>>>> ' + path);
                                    fun(id, numbrOrder, Rounds + 1);;
                                };
                            }, 60000);
                        }
                    } else {
                        resolve(objResult);
                    };
                });
            }
            fun(idOld, numbrOrderOld, 0);
        });
    };



    impositionCalculation(size, sheet, gater) {
        size = size.split('x');
        sheet = sheet.split('x');
        if (sheet[0] > sheet[1]) {
            let temporary = sheet[0];
            sheet[0] = sheet[1];
            sheet[1] = temporary;
        };
        let widthIm = 0;
        let heightIm = 0;
        let widthImB = 0;
        let heightImB = 0;
        let QuantityInsideSheet = 0;
        let newSheet = sheet;
        widthIm = Math.floor(((sheet[0] * 1) - 2.2 - gater) / ((size[0] * 1) + gater));
        heightIm = Math.floor(((sheet[1] * 1) - 0.4 - gater) / ((size[1] * 1) + gater));

        QuantityInsideSheet = widthIm * heightIm;
        const checkImEpoch = () => {
            let temporary = newSheet[0];
            newSheet[0] = newSheet[1];
            newSheet[1] = temporary;
            widthImB = Math.floor(((newSheet[0] * 1) - 0.4 - gater) / ((size[0] * 1) + gater));
            heightImB = Math.floor(((newSheet[1] * 1) - 2.2 - gater) / ((size[1] * 1) + gater));
            if (widthImB * heightImB > QuantityInsideSheet) {
                QuantityInsideSheet = widthImB * heightImB;
                widthIm = widthImB;
                heightIm = heightImB;
            };
        };
        checkImEpoch();
        if (widthIm > heightIm) {
            let temporary = widthIm;
            widthIm = heightIm;
            heightIm = temporary;
        };
        return { QuantityInsideSheet: QuantityInsideSheet, sheet: sheet.join('x'), size: size.join('x'), templaleEditor: widthIm + 'x' + heightIm }
    }
};

module.exports = new fildData();
