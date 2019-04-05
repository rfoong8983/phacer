let express = require('express');
router = module.exports = express.Router();

router.use(require('cookie-parser')());

router.use(function (req, res, next) {
    let mc = req.cookies._mc;

    if (!mc) {
        let id = new Date().getTime().toString();
        res.cookie('_mc', id);
        req.cookies._mc = id;
    }

    next();
});