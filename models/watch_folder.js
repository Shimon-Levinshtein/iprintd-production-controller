
const fs = require("fs");
const parseString = require('xml2js').parseString;
const chackXMLfile = require('./chack_XML_file');
const modelsSequelize = require('../mySql/models_sequelize');
const modelsOrdersCount = require('../mySql/models_orders_count');


console.log();


class Watch {
    constructor() {

    }

    watchPQFiles() {
       
        try {
            // Watch the sim directory
            fs.watch("//BINAW/data/PQFiles", { persistent: true }, function (event, fileName) {

                // Creates a folder Scodix
                try {
                    modelsSequelize.controlr_buttons.findAll({ where: { id: 1 } })
                        .then(arr => {
                            if (arr[0].On_Off == 'on') {
                                if(!arr){
                                    return
                                }
                                if (event == 'change') {
                                    if (fileName.startsWith("PQ") && fileName.includes("PD-4")) {
                                        fs.readdir('//BINAW/data/PQFiles/' + fileName, (err, files) => {
                                            if (!files) return
                                            files.forEach(element => {
                                                if (element > 0 || element < 50) {
                                                    let test = fs.statSync('//BINAW/data/PQFiles/' + fileName + '/' + element);
                                                    if (test.isDirectory()) {
                                                        const folders = fs.readdirSync('//BINAW/data/PQFiles/' + fileName + '/' + element);
                                                        if (!folders.includes("Scodix")) {
                                                            fs.mkdir('//BINAW/data/PQFiles/' + fileName + '/' + element + '/Scodix', { recursive: true }, function (err) {
                                                                if (err) console.log(err);
                                                            });
                                                        };
                                                    };
                                                };
                                            });
                                        });
                                    };
                                };
                            };
                        })
                        .catch(err => console.log(err))
                } catch (arr) {
                    console.log('Creates a folder Scodix function!!!\n');
                    console.log('Error in file: --> ' + __filename + '\n');
                    console.log(arr);
                }

                // Creates a folder pp
                try {
                    if (fileName.startsWith("PQ") && fileName.includes("PD-") || fileName.includes("BD-")) {
                        modelsSequelize.controlr_buttons.findAll({ where: { id: 2 } })
                            .then(arr => {
                                if (arr[0].On_Off == 'on') {
                                    if (event == 'change') {

                                        fs.readdir('//BINAW/data/PQFiles/' + fileName, (err, files) => {
                                            if(files) {
                                                files.forEach(element => { 
                                                    if (element > 0 || element < 50) {
                                                        let test = fs.statSync('//BINAW/data/PQFiles/' + fileName + '/' + element);
                                                        if (test.isDirectory()) {
                                                            const folders = fs.readdirSync('//BINAW/data/PQFiles/' + fileName + '/' + element);
                                                            if (!folders.includes("pp")) {
                                                                fs.mkdir('//BINAW/data/PQFiles/' + fileName + '/' + element + '/pp', { recursive: true }, function (err) {
                                                                    if (err) console.log(err);
                                                                });
                                                            };
                                                            if (!folders.includes("Esko")) {
                                                                fs.mkdir('//BINAW/data/PQFiles/' + fileName + '/' + element + '/Esko', { recursive: true }, function (err) {
                                                                    if (err) console.log(err);
                                                                });
                                                            };
                                                        };
                                                    };
                                                });
                                            };
                                        });
                                    };
                                };
                            })
                            .catch(err => console.log(err))
                    };
                } catch (arr) {
                    console.log('Creates a folder pp function!!!\n');
                    console.log('Error in file: --> ' + __filename + '\n');
                    console.log(arr);
                }

                // var d = new Date();
                // console.log(d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds());
                // console.log("Event PQFiles: " + event);
                // console.log(fileName + "\n");
            });
        } catch (err) {
            console.log('Error in file: --> ' + __filename);
            console.log(err);
        }

    };

    watchProductionFiles() {
        let ordersFromSql = [];
        modelsOrdersCount.OrdersCount.findAll()
                .then(result => {
                    result.forEach(element => {
                        if(ordersFromSql.includes(element.numbrOrder + '/' +  Number(element.itemID))) {
                        }
                        ordersFromSql.push(element.numbrOrder + '/' +  Number(element.itemID));
                    });
                });
        try {
            fs.watch("//BINAW/data/ProductionFiles", { persistent: true }, function (event, fileName) {
                if (!fileName) return;

                if (event == 'change') {
                    if (fileName.startsWith("SO") && fileName.includes("PD-4") || fileName.includes("BD-1")) {
                        modelsSequelize.controlr_buttons.findAll({ where: { id: 3 } })
                            .then(arr => {
                                if(!arr){
                                    return
                                }
                                if (arr[0].On_Off == 'on') {
                                    
                                    // var d = new Date();
                                    // console.log(d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds());
                                    // console.log("Event ProductionFiles: " + event);
                                    // console.log(fileName + "\n");
                                    setTimeout(function () {
                                        fs.readdir('//BINAW/data/ProductionFiles/' + fileName, (err, files) => {
                                            if (!files) return;
                                            if (!files.includes(`sticker_${fileName}.pdf`)) {
                                                files.forEach(element => {
                                                    if (element > 0 || element < 50) {
                                                        let test = fs.statSync('//BINAW/data/ProductionFiles/' + fileName + '/' + element);
                                                        if (test.isDirectory()) {
                                                            const foldersArr = fs.readdirSync('//BINAW/data/ProductionFiles/' + fileName + '/' + element);
                                                            if (foldersArr.includes("XMLs")) {
                                                                if (!ordersFromSql.includes(fileName + '/' + element)) {
                                                                    ordersFromSql.push(fileName + '/' + element);
                                                                    const XMLsArr = fs.readdirSync('//BINAW/data/ProductionFiles/' + fileName + '/' + element + '/XMLs');
                                                                    const xmlFil = fs.readFileSync('//BINAW/data/ProductionFiles/' + fileName + '/' + element + '/' + 'XMLs/' + XMLsArr[0], { encoding: 'utf-8' });
                                                                    parseString(xmlFil, function (err, result) {
                                                                        if (err) {
                                                                            console.log('ERROR: ' + err);
                                                                            return
                                                                        }
                                                                        chackXMLfile.chackXMLfile(result, '//BINAW/data/ProductionFiles/' + fileName + '/' + element);
                                                                        chackXMLfile.insertOrderToDataBase(result, '//BINAW/data/ProductionFiles/' + fileName + '/' + element);
                                                                        console.log('insertOrderToDataBase+++++++++++++++++++++++++++++++++++++');
                                                                    })
                                                                }
                                                            };
                                                        };
                                                    };
                                                });
                                            }
                                        });
                                    }, 120000);
                                }
                            })
                            .catch(err => console.log(err))
                    };
                }
            });
        } catch (err) {
            console.log('Error File: \n' + __filename + '\n Functin watchProductionFiles() \n' + err);

        }

    }

};

module.exports = new Watch();


