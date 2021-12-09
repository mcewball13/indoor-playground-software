const router = require("express").Router();
const { Post, Comment, User, Votes, Picture } = require("../models");
const sequelize = require("../config/connection");
const isSignedIn = require("../utils/userAuth");

router.get("/", isSignedIn, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id,
        },
        attributes: [
            "id",
            "title",
            "created_at",
            [
                sequelize.literal(
                    "(SELECT COUNT(*) FROM votes WHERE post.id = votes.post_id)"
                ),
                "vote_count",
            ],
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_text",
                    "post_id",
                    "user_id",
                    "created_at",
                ],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
            {
                model: User,
                attributes: ["username"],
            },
            {
                model: Picture,
                attributes: ["image_url"],
            },
        ],
    }).then((dbPostData) => {
        const posts = dbPostData.map((post) => {
            post.dataValues.loggedIn = req.session.loggedIn;
            return post.get({ plain: true });
        });
        res.render("dashboard", { posts, loggedIn:req.session.loggedIn });
    }).catch((err) => {
        res.status(500).json(err);
        console.log(err)
    });
});
module.exports = router;
