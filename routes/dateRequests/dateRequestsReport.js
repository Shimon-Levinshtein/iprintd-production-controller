var express = require('express');
var router = express.Router();
const automationSequelize = require('../../mySql/automation');
const { Op } = require('sequelize')
const moment = require('moment');




router.get('/data', function (req, res, next) {
  automationSequelize.automationData.findAll({
    where: {
      WhenDidTheOrderArrive: {
        [Op.gte]: moment().subtract(5, 'days').toDate()
      }
    }
  })
  .then(objReport => {
    
    res.send(JSON.stringify(objReport));
  })
});

router.get('/get-data-by-days/:days', function (req, res, next) {
  const days = req.params.days;
  const momentReport = new Date();
  momentReport.setHours(8);
  momentReport.setMinutes(0);
  momentReport.setSeconds(0);
  momentReport.setDate(momentReport.getDate() - days + 1);
  automationSequelize.automationData.findAll({
    where: {
      WhenDidTheOrderArrive: {
        [Op.gte]: momentReport
      }
    }
  })
    .then(objReport => {
      
      res.send(JSON.stringify(objReport));
    })
});

// router.get('/data:days', function (req, res, next) {
//   dataRequest.requestDataByDaysBack(1)
//   .then(value => {
//     res.render('automationReport/automationReportScreen', { objOrders: value});
//   })
// });

// router.get('/cd/:path', function (req, res, next) {
//   const path = req.params.path;
//   const locשtion = fuFs.fixPath(path, true);
//   res.render('1_Browse_files/browse_files', { title: 'Browse files', contentFolder: fuFs.contentFolder(path), locשtion: locשtion });
// });

// router.get('/duplicate/:path', function (req, res, next) {
//   const path = req.params.path;
//   fuFs.duplicate(fuFs.fixPath(path, true));
//   const locשtion = fuFs.cutLastDir(fuFs.fixPath(path, true));
//   res.render('1_Browse_files/browse_files', {title: 'Browse files', contentFolder: fuFs.contentFolder(locשtion), locשtion: locשtion });
// });

// router.get('/delete/:path', function (req, res, next) {
//   const path = req.params.path;
//   fuFs.delete(fuFs.fixPath(path, true));
//   const locשtion = fuFs.cutLastDir(fuFs.fixPath(path, true));
//   res.render('1_Browse_files/browse_files', { title: 'Browse files', contentFolder: fuFs.contentFolder(locשtion), locשtion: locשtion });
// });

// /* POST home page. */
// router.post('/cd', function (req, res, next) {
//   const path = req.body.path;
//   const locשtion = fuFs.fixPath(path, true);
//   res.render('1_Browse_files/browse_files', { title: 'Browse files', contentFolder: fuFs.contentFolder(path), locשtion: locשtion });
// });




module.exports = router;