var express = require('express');
var router = express.Router();
const tesksJs = require('../../public/javascripts/2_controlr_fils/tesks');
const controlr = require('../../public/javascripts/2_controlr_fils/controler_buttons');


/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.query.chekBoxBoutton) {
    if (req.query.oldClass == 'mark-list') {
      tesksJs.update(req.query.chekBoxBoutton, 'not') 
        .then(update => {
          res.redirect('/management-it-controlr-fils')
        })
      return;
    } else {
      tesksJs.update(req.query.chekBoxBoutton, 'mark-list')
        .then(update => {
          res.redirect('/management-it-controlr-fils')
        })
      return;
    }
  }
  tesksJs.selectAllFromTable('2_controlr_fils', 'tesks')  
    .then(list => {
      controlr.createAllControl()
        .then(divCo => {
          res.render('2_controlr_fils/2_controlr_fils', {
            title: 'Controlr fils',
            tesk: list,
            editTesks: false,
            contrilsButtons: divCo
          });
        })
    })
});
/* delete */
router.get('/delete', (req, res) => {
  tesksJs.delete(req.query.deleteID) 
    .then(de => {
      res.redirect('/management-it-controlr-fils');
    });
});
/* etit */
router.get('/edit', (req, res) => {
  
  tesksJs.selectAllFromTable('2_controlr_fils', 'tesks') 
  .then(list => {
    tesksJs.selectByID(req.query.editId) 
    .then(myTesk => {
          res.render('2_controlr_fils/2_controlr_fils', {
            title: 'Controlr fils',
            tesk: list,
            editTesks: true,
            textTesk: `<input type="text" name="newTesk" value='${myTesk[0].tesk}' >
          <br>
          <input class="display-none" type="text" name="idTesk" value='${myTesk[0].id}' >
          `,
            editId: req.query.editId,
            contrilsButtons: false
          });
        })
    })
});
/* POST edit. */
router.post('/edit', function (req, res, next) {

  tesksJs.edit(req.body.idTesk, req.body.newTesk)
    .then(result => {
      res.redirect('/management-it-controlr-fils');
    })

});

/* POST. */
router.post('/', function (req, res, next) {
  if (req.body.task) {
    tesksJs.insertInto(req.body.task) 
      .then(result => {
        res.redirect('/management-it-controlr-fils')
      })
  } else {
    res.redirect('/management-it-controlr-fils')
  }
});

/* GET buttons controls */

router.get('/buttons-controls', (req, res) => {
  let classDiv = req.query.class;
  let offOn = '';
  if (classDiv == 'not') {
    classDiv = 'q-input-blue';
    offOn = 'on';
  } else {
    classDiv = 'not';
    offOn = 'off';
  }
  controlr.buttonONOOf(req.query.controlButtonID, classDiv, offOn)
    .then(() => {
      res.redirect('/management-it-controlr-fils');
    })

});








module.exports = router;