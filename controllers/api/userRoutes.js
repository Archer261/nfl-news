const router = require('express').Router();
const { User } = require('../../models');
const setSessionStorage = require("../../utils/helpers");


var sessionEmail = '';

// CREATE new user
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        });

        

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
});

sessionEmail = req.body.email;

        if (!dbUserData) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
        });

        
        
        setSessionStorage(sessionEmail);
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
