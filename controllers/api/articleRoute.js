const router = require("express").Router();
const bcrypt = require("bcrypt");
const getLinks = require('../../utils/getArticleData');
const User = require("../../models/User");
const Article = require("../../models/Article");
const Source = require("../../models/Source");

router.post('/savearticle', async (req, res) => {
    try {
        const dbArticleData = await Article.create({
            user_id: req.body.user_id,
            title: req.body.title,
            link: req.body.link
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbArticleData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/deletearticle', async (req, res) => {
    try {
        await Article.destroy({
            where: { 
            title: req.body.title,
            user_id: req.body.user_id  
        },
          })
        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
