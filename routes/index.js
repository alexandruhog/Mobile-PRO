var express = require('express');
const passport = require('passport');
const Account = require('../models/account');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        user: req.user
    });
});

router.get('/register', (req, res) => {
    res.render('register', {});
});

router.post('/register', (req, res) => {
    //!! register e metoda din passport-local-mongoose !!
    console.log(req.body.username+" "+req.body.password);
    Account.count((err, count) => { // 03:45 merge tiganeala cu count
      //  console.log(req.body.username + " : " + req.body.password);
        Account.register(new Account({
            _id: count, //daca vreau sa indexez dupa count
            username: req.body.username,
            societate: req.body.societate,
            numePrenume: req.body.numePrenume
            //  _id: 1
        }), req.body.password, (err, account) => {
            if (err) { //daca exista
                res.send('0');
            }
            //local vine de la passport-local
            //strategie locala predefinita (DOCUMENTATIE)
            passport.authenticate('local')(req, res, () => {//citeste pe net cum functioneaza
                res.send('1');
            });
        });
    })
});

router.get('/login', (req, res) => {
    res.render('login', {
        user: req.user
    });
});

// CUSTOM CALLBACK
router.post('/login', (req, res, next) => {
  console.log(req.body.username + " " +req.body.password);
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err); // will generate a 500 err
        }
        // Generate a JSON response
        if (!user) {
            return res.send('0');
        }
        req.login(user, loginErr => {
            if (loginErr) {
                return next(loginErr);
            }
            return res.send('1');
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res) {
    res.status(200).send("pong!");
});

module.exports = router;
