const router = require('express').Router();
const { User } = require('../../models');
const user = require('../models');
const withAuth = require('../utils/auth');


var hbscontent = {username: '', password: ''};

router.route('/signup')
.get((req, res) => {
res.render('signUp', hbscontent)
.post((req, res) => {
    User.create(
        {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        
        }
    )
    .then(user => {
        req.session.user = user.dataValues;
        res.redirect('/')
    })
    .catch(error => {
        res.redirect('/signup');
    });
}

})