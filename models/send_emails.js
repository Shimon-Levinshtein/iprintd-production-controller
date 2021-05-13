const modelsOrdersCount = require('../mySql/models_orders_count');
const moment = require('moment');
const { Op } = require('sequelize')
const nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";





// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'prepress@iprintd.com',
//         pass: 'a1b2c3d4'
//     }
// });

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

class SendEmailsControl {
    constructor() {

    }
    sendTest() {
        const mailOptions = {
            from: 'prepress@iprintd.com',
            to: 'prepress@iprintd.com',
            subject: 'Sending Email using Node.js',
            text: 'That was test!',
            html: "<b>Hello world?</b>"
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    sendEmail(to, subject, text, html) {
        const mailOptions = {
            from: 'prepress@iprintd.com',
            to: to,
            subject: subject,
            text: text,
            html: html
        };
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                // console.log('Email sent: ' + info.response);
                console.log('The email sented!');
            //   console.log(info);
            }
        });
    };
    
    dailyReport() {
        modelsOrdersCount.OrdersCount.findAll({
            where: {
                createdAt: {
                    [Op.gte]: moment().subtract(1, 'days').toDate()
                }
            }
        })
        .then(result => {
            let obgPrePress = {};
            // console.log(result.length);
            result.forEach(element => {
                    if(!obgPrePress[element.doerName]){
                        obgPrePress[element.doerName] = []
                    }else{
                        obgPrePress[element.doerName].push({
                            numbrOrder: element.numbrOrder,
                            numbrOrderAndIitem: element.numbrOrderAndIitem,
                            itemID: element.itemID,
                            product: element.product,
                            cprofNum: element.product,
                            doerName: element.doerName,
                            salesAgent: element.salesAgent
                        }) 
                            

                    }
                });
                for (var key in obgPrePress){
                    let html = `
                    <div dir="rtl">
                        <h2>דוח יומי ${key}</h2>
                        <h4>כמות סעיפים בהזמנות ל24 שעות אחורה ${obgPrePress[key].length} סעיפים</h4>
                    `
                    obgPrePress[key].forEach(element => {
                        html += `<p> מספר הזמנה: <a href="https://priority/priority/openmail.htm?priority:%20priform#ORDERS:%20${element.numbrOrder}:%20iprint1:%20tabula.ini">${element.numbrOrderAndIitem}</a> | שם פריט: ${element.product} </p>`
                    });
                    html += `</div>`
                    if (key == "Yakov" || key == "Dudu" || key == "Liranp" ) {
                        this.sendEmail('shimon@iprintd.com', 'דוח', '', html);
                        this.sendEmail('dudu@iprintd.com', 'דוח', '', html);
                    }
                }
            });
    }
}

module.exports = new SendEmailsControl();
