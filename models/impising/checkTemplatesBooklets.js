const allOrdersData = require('../../mySql/all_orders');
const fs = require("fs");






class Checkemplates {
    constructor() {

    }

    PreparationTemplateTablets() {

        const arrSizes = [];
        const arrTemplaleEditor = [];
        const obgSizes = {};

        allOrdersData.AllOrders.findAll({})
            .then(order => {
                console.log('**************************************typeof order');
                order.forEach(element => {
                    const parameters = JSON.parse(element.arrWitTheProperties);
                    if (parameters.Product[0] == 'חוברת סיכות' || parameters.Product[0] == 'חוברת סיכות מחשבון') {
                        let size = parameters.AssetSize[0].split('*').join('x').split('X').join('x').split('/').join('x').split('x');
                        if (size.length > 1) {
                            size[0] = size[0] * 1;
                            size[1] = size[1] * 1;
                            let temporary = ''
                            if (size[0] > size[1]) {
                                temporary = size[0];
                                size[0] = size[1];
                                size[1] = temporary;
                            };
                            size = size.join('x');
                            if (size.split('x')[1] * 1 < 75 && size.split('x')[0] * 1 < 53 && size.split('x')[1] * 1 > 11.9 && size.split('x')[0] * 1 > 8.9) {
                                if (!arrSizes.includes(size)) {
                                    arrSizes.push(size);
                                    let sizeNew = size.split('x');
                                    let temporary = '';
                                    temporary = sizeNew[0];
                                    sizeNew[0] = sizeNew[1];
                                    sizeNew[1] = temporary;
                                    sizeNew = sizeNew.join('x');
                                    const arrSheetSizes = ['75x53', '70x50', '48.2x33'];
                                    arrSheetSizes.forEach(sheetSize => {
                                        let impositionResult = this.impositionCalculation(size, sheetSize, 0.4);
                                        let impositionResultNew = this.impositionCalculation(sizeNew, sheetSize, 0.4);
                                        if (obgSizes[impositionResult.templaleEditor]) {
                                            obgSizes[impositionResult.templaleEditor] = {
                                                templaleEditor: impositionResult.templaleEditor,
                                                count: obgSizes[impositionResult.templaleEditor].count + 1,
                                                size: { ...obgSizes[impositionResult.templaleEditor].size, [size]: size }
                                            }
                                        } else {
                                            obgSizes[impositionResult.templaleEditor] = { templaleEditor: impositionResult.templaleEditor, count: 1, size: { [size]: size } }
                                        }
                                        if (obgSizes[impositionResultNew.templaleEditor]) {
                                            obgSizes[impositionResultNew.templaleEditor] = {
                                                templaleEditor: impositionResultNew.templaleEditor,
                                                count: obgSizes[impositionResultNew.templaleEditor].count + 1,
                                                size: { ...obgSizes[impositionResultNew.templaleEditor].size, [size]: size }
                                            }
                                        } else {
                                            obgSizes[impositionResultNew.templaleEditor] = { templaleEditor: impositionResultNew.templaleEditor, count: 1, size: { [size]: size } }
                                        }

                                        //     if (!arrTemplaleEditor.includes(impositionResult.templaleEditor)) {
                                        //         if (impositionResult.templaleEditor.split('x')[0] * 1 > 0) {
                                        //             console.log(impositionResult.templaleEditor);
                                        //             arrTemplaleEditor.push(impositionResult.templaleEditor);
                                        //         };
                                        //     };
                                    });
                                }
                            }
                        }
                    };
                });
                console.log("length of arrSizes ===>>> " + arrSizes.length);
                console.log("length of arrTemplaleEditor ===>>> " + arrTemplaleEditor.length);
                // console.log(arrTemplaleEditor);
                // console.log(obgSizes);
                for (const key in obgSizes) {
                    if (Object.hasOwnProperty.call(obgSizes, key)) {
                        const element = obgSizes[key];
                        let result = '';
                        let resultArr = Object.keys(element.size).map((key) => element.size[key]);
                        resultArr = resultArr.join(' | ');
                        result = element.templaleEditor + '&' + element.count + '&' + resultArr
                        console.log(result);
                    }
                }
            }).catch(err => {
                console.log(err);
            });

        console.log('**************************************typeof order');
    };

    impositionCalculation(size, sheet, gater) {
        let sizeOld = size.split('x').join('x');
        size = size.split('x');
        size[0] = size[0] * 2;
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
        return { QuantityInsideSheet: QuantityInsideSheet, sheet: sheet.join('x'), size: sizeOld, templaleEditor: widthIm + 'x' + heightIm }
    }
};

module.exports = new Checkemplates();

