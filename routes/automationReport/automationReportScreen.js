var express = require('express');
var router = express.Router();
const reqestData = require('../../public/javascripts/automationReport/reqestData');
const dataRequest = require('../../models/automationReport/dataRequest');



/* GET home page. */
router.get('/', function (req, res, next) {
  reqestData.ulReportByDays(5)
  .then(objReport => {
    
    res.render('automationReport/automationReportScreen', { ulRight: objReport.ulRedyRight, ulLeft: objReport.ulLeft, svg: objReport.svg, percent: objReport.percent});
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