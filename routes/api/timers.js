const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const CryptoJS = require('crypto-js');
const Timer = require('../../models/Timer');

router.get('/', (req, res) => {
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
  console.log(req.headers.cookie.split(';'))
  const d = new RegExp('[^n=][A-Za-z0-9].+');
  let v = req.headers.cookie.split(';')[0];
  // v = v.substring(3);
  // v = v.match(d);
  console.log(v.substring(2));
  // console.log(req.headers.cookie);
  // res.cookie('n', [req.headers.cookie.split(';')[0], 'n=' + Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15)].join('; '));
  // console.log(res.cookie());
  let s = req.body.s;
  let decrypted = CryptoJS.AES.decrypt(req.body.encrypted, req.user.id);
  // let arr = localStorage;
  // console.log(req.body.s);
  
  let str = decrypted.toString(CryptoJS.enc.Utf8);
  let decryptedBody = JSON.parse(str);
  let end = decryptedBody.endTime;
  const justSecs = new RegExp('[0-9]+\.[0-9]');
  // console.log(v, s);
  res.cookie('n', 'test;');
  console.log(v.substring(2), s);
  console.log(JSON.stringify(v.substring(2)) !== JSON.stringify(s));
  if (v.substring(2) !== s) return res.json('');
  if (!req.body.s) return;
  console.log('past checkpoints')
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
  newTimer.save().then(timer => res.json(timer));
  return;
});

module.exports = router;