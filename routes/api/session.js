const express = require('express');
const router = express.Router();
const db = require('../../config/keys').mongoURI;
const mongoose = require('mongoose');
const session = require('../../models/Session');

router.get('/', (req, res) => {
    // return session.findOne({find: 1})
    //     .then(sess => res.send(sess.curr));
    session.findOne({find: 1})
        .then(sess => {
            return res.send(sess.curr);
        });
});

router.post('/', (req, res) => {
    session.findOne({find: 1}, function (err, doc) {
        doc.curr = Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);
        doc.save();
    });
    // const test = new session({find: 1, curr: 'test'});
    // test.save()
    //     .then((a) => console.log(a))
    //     .catch((err) => res.json(err));
    return;
});

module.exports = router;