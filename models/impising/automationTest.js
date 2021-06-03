const allOrdersData = require('../../mySql/all_orders');
const moment = require('moment');
const { Op } = require('sequelize')
const nodemailer = require('nodemailer');
const fs = require("fs");
const { numberToString } = require('pdf-lib');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const transporter = nodemailer.createTransport({
    servise: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'prepress@iprintd.com',
        pass: 'a1b2c3d4'
    }
});


class AutomationTest {
    constructor() {

    };

    checkOrderSection(XMLArr, path) {
        // console.log('+++++++++++++++++++checkOrderSection++++++++++++++++++++++++');
        // console.log(path);
        this.CheckImposingFileExists(XMLArr, path)
        // console.log('+++++++++++++++++++checkOrderSection++++++++++++++++++++++++');
    };

    CheckImposingFileExists(XMLArrA, pathA) {
        const fun = (XMLArr, path, Rounds) => {
            fs.readdir(path + "/imposed", (err, files) => {
                // console.log('fs.readdir');
                // console.log(files);
                // console.log(XMLArr);
                if (XMLArr.jobDetails.Prepress[0] == 'Automatic') {

                    if (files) {
                        // console.log('Send mail: ==>> ' + path);
                        // console.log(XMLArr);
                        const mailOptions = {
                            from: 'prepress@iprintd.com',
                            to: 'shimon@iprintd.com',
                            subject: `בדיקת אוטומציה ${XMLArr.jobDetails.Product[0]} ${XMLArr.jobDetails.JobNo[0]}`,
                            html: `<div dir="rtl">
                            <p>${path}</p>
                            <p>מצורף סעיף של הזמנה לבדיקת אמפוזיציה לאחר אוטומציה</p>
                            <p> מספר הזמנה: <a href="https://priority/priority/openmail.htm?priority:%20priform#ORDERS:%20${XMLArr.jobDetails.JobNo[0]}:%20iprint1:%20tabula.ini">${XMLArr.jobDetails.JobNo[0]}</a> </p>
                            </div>
                            `
                        };


                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('The email sented!');
                            }
                        });
                    } else {
                        setTimeout(function () {
                            if (Rounds < 20) {
                                // console.log('setTimeout: ------------->>>>>>>>>>>> ' + path);
                                fun(XMLArr, path, Rounds + 1);
                            };
                        }, 60000);
                    };
                }
            });
        };
        fun(XMLArrA, pathA, 0);
    };


};

module.exports = new AutomationTest();
