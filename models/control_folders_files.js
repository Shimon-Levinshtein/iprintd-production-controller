const watchFolder = require('./watch_folder');
const sendEmails = require('./send_emails');
const modelsSequelize = require('../mySql/models_sequelize');



const listButtonControls = [
   {
      id: 1,
      button_name: 'מייצר תיקית סקוודיקס לכל סעיף בהצעת מחיר'
   },
   {
      id: 2,
      button_name: 'מייצר תיקית pp לכל סעיף בהצעת מחיר'
   },
   {
      id: 3,
      button_name: 'XML בדיקת קובץ '
   },
];

listButtonControls.forEach(element => {
   modelsSequelize.controlr_buttons.create({
   id: element.id,
   button_name: element.button_name
});
   
});


class ControlerFF {
   constructor() {

   }

   allControlers() {

      watchFolder.watchPQFiles();
      watchFolder.watchProductionFiles();
      sendEmails.dailyReport();
   }
}




module.exports = new ControlerFF();