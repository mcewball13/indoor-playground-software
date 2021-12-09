const router = require("express").Router();
const { Comment } = require("../../models");
// grab number of comments per post?
const sequelize = require('../../config/connection');
const isSignedIn = require("../../utils/userAuth");

router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbComData => res.status(200).json(dbComData))
    .catch(err => {
        res.status(500).json(err)
    });
});

router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    }).then(dbComData => {
        res.status(200).json({message: "Successfully Created"})
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});
router.delete('/:id', isSignedIn, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbComData => {
        if (!dbComData) {
            res.json(404).json({message: "Something Went Wrong, we cant find the comment for some reason"})
            return;
        }
        res.json(dbComData)
    }).catch(err => {
        res.status(500).json(err);
    })
})

    
module.exports = router;