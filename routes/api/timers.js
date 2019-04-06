const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const CryptoJS = require('crypto-js');
const session = require('../../models/Session');
const Timer = require('../../models/Timer');

// if (typeof localStorage === "undefined" || localStorage === null) {
//   const LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = newLocalStorage('./scratch');
// }

router.get('/', (req, res) => {
  res.cookie('test', Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15));
  
  Timer.find()
    .sort({date: -1})
    .then(timers => res.json(timers))
    .catch(err => res.status(404).json({notimersfound: 'No timers found'}));
});

router.get('/user/:user_id', (req, res) => {
  Timer.find({user: req.params.user_id})
    .sort({date: -1})
    .then(timers => res.json(timers))
    .catch(err =>
      res.status(404).json({notimersfound: 'No timers found from that user'}
      )
    );
});



router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.body.t);
  console.log(req.body.ran);
  const d = new RegExp('[^ s=][^s=][A-Za-z0-9].+');
  
  session.findOne({ find: 1 }, (err, doc) => {
    console.log(doc);
    return res.json(doc);
  })
    .then(prev => {
      console.log(prev.curr, req.body.t);
      console.log(prev.curr === req.body.t);
      if (prev.curr !== req.body.t) return "";
      // console.log(req.headers.cookie.split(';'));
      // let v = req.headers.cookie.split(';')[2]; // users's s from request
      // v = v.match(d)[0];
      
      let decrypted = CryptoJS.AES.decrypt(req.body.encrypted, req.user.id);
      
      let str = decrypted.toString(CryptoJS.enc.Utf8);
      let decryptedBody = JSON.parse(str);
      let end = decryptedBody.endTime;
      const justSecs = new RegExp('[0-9]+\.[0-9]');
      
      console.log(prev.curr, req.body.t);
      
      console.log('past checkpoints');
      if ((end[end.length-2] + end[end.length-1]) === 'ms') {
        end = "cheater";
      } else if (end.match(justSecs)[0]) {
        if (parseFloat(end.match(justSecs)[0]) > 10.0) {
          end = end;
        } else {
          end = 'cheater';
        }
      } else {
        end = 'cheater';
      }

      const newTimer = new Timer({
        endTime: end,
        intTime: decryptedBody.intTime,
        handle: decryptedBody.handle,
      });
      newTimer.save().then(timer => {
        return res.json(timer);
      });
      return req.body.t;
    })
    .then((el) => {
      console.log('el: ', el);
      session.findOne({ find: 1 }, (err, doc) => {
        if (el.length > 0) {
          doc.curr = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          // doc.curr = el;
          doc.save();
        }
      });
    })
    .catch(err => console.log(err));
  
});

module.exports = router;