const allOrdersData = require('../../mySql/all_orders');





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
                    let size = parameters.AssetSize[0].split('*').join('x').split('X').join('x').split('/').join('x').split('x');
                    if (size.length > 1) {
                        let temporary = ''
                        size[0] = size[0] * 1;
                        size[1] = size[1] * 1;
                        if (size[0] > size[1]) {
                            temporary = size[0];
                            size[0] = size[1];
                            size[1] = temporary;
                        };
                        size = size.join('x');
                        if (size.split('x')[1] * 1 < 75 && size.split('x')[0] * 1 < 53 && size.split('x')[1] * 1 > 0 && size.split('x')[0] * 1 > 0) {
                            if (!arrSizes.includes(size)) {
                                arrSizes.push(size);
                                const arrSheetSizes = ['75x53','70x50','48.2x33'];
                                arrSheetSizes.forEach(sheetSize => {
                                    let impositionResult =  this.impositionCalculation(size, sheetSize, 0.4);
                                    if (obgSizes[impositionResult.templaleEditor]) {
                                        obgSizes[impositionResult.templaleEditor] = {templaleEditor: impositionResult.templaleEditor, count: obgSizes[impositionResult.templaleEditor].count + 1, size: size}
                                    } else {
                                        obgSizes[impositionResult.templaleEditor] = {templaleEditor: impositionResult.templaleEditor, count: 1}
                                    }
                                    if (!arrTemplaleEditor.includes(impositionResult.templaleEditor)) {
                                        if (impositionResult.templaleEditor.split('x')[0] * 1 > 0) {
                                            console.log(impositionResult.templaleEditor);
                                            arrTemplaleEditor.push(impositionResult.templaleEditor);
                                        };
                                    };
                                });
                            }
                        }
                    }
                });
                console.log("length of arrSizes ===>>> " + arrSizes.length);
                console.log("length of arrTemplaleEditor ===>>> " + arrTemplaleEditor.length);
                console.log(arrTemplaleEditor);
                console.log(obgSizes);
            }).catch(err => {
                console.log(err);
            });

        console.log('**************************************typeof order');
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
            if (widthImB * heightImB > QuantityInsideSheet){
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
        return { QuantityInsideSheet: QuantityInsideSheet, sheet: sheet.join('x'), size: size.join('x'), templaleEditor: widthIm + 'x' + heightIm}
    }
};

module.exports = new Checkemplates();
