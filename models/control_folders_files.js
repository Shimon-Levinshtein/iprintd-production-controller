const watchFolder = require('./watch_folder');
const sendEmails = require('./send_emails');
const checkTemplates = require('./impising/checkTemplates');
const checkTemplatesBooklets = require('./impising/checkTemplatesBooklets');
const checkTemplatesReady = require('./impising/checkTemplatesReady');
const modelsSequelize = require('../mySql/models_sequelize');
const automationTest = require('./impising/automationTest');
const fildData = require('./automationReport/fildData');
const test = require('./tests/test');




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

// listButtonControls.forEach(element => {
//    modelsSequelize.controlr_buttons.create({
//       id: element.id,
//       button_name: element.button_name
//    })
//       .then(function (user) {
//          // you can now access the newly created user
//          console.log('success', user.toJSON());
//       })
//       .catch(function (err) {
//          // print the error details
//          console.log(err);
//       });
// });

class ControlerFF {
   constructor() {

   }

   allControlers() {
      // automationTest.checkOrderSection({Prepress: 'Automatic', numbrOrder: 'SO21PD-402788'}, '//BINAW/data/ProductionFiles/SO21PD-402788/1');
      // checkTemplates.PreparationTemplateTablets();
      // checkTemplatesBooklets.PreparationTemplateTablets();
      // checkTemplatesReady.calculator();
      // fildData.xxx();
      // fildData.fildDataByOrder("SO21PD-403686-007");
      // test.test();
   
      watchFolder.watchPQFiles();
      watchFolder.watchProductionFiles();
      this.HourlyFunction();
   };

   HourlyFunction = () => {
      const hourNow = new Date().getHours();
      if (hourNow == 17) {
         sendEmails.dailyReport();
      };
      setTimeout(() => {
         this.HourlyFunction();
      }, 1000 * 60 * 59);
   };
}




module.exports = new ControlerFF();