const modelsOrdersCount = require('../mySql/models_orders_count');
const moment = require('moment');
const { Op } = require('sequelize')
const nodemailer = require('nodemailer');





const transporter = nodemailer.createTransport({
    service: 'gmail',
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
                console.log('Email sent: ' + info.response);
            }
        });
    }
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
                        <h4>כמות ההזמנות ל24 שעות אחורה ${obgPrePress[key].length} הזמנות</h4>
                    `
                    obgPrePress[key].forEach(element => {
                        html += `<p> מספר הזמנה: <a href="https://priority/priority/openmail.htm?priority:%20priform#ORDERS:%20${element.numbrOrder}:%20iprint1:%20tabula.ini">${element.numbrOrderAndIitem}</a> | שם פריט: ${element.product} </p>`
                    });
                    html += `</div>`
                    
                    // console.log(html);
                    
                    this.sendEmail('prepress@iprintd.com', 'דוח', '', html)
                }
            });
    }
}

module.exports = new SendEmailsControl();
