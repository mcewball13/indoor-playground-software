const router = require("express").Router();
const {
    Post,
    User,
    Comment,
    Picture,
    Tags,
    Difficulty,
    Type,
} = require("../../models");
const sequelize = require("../../config/connection");
const { Op } = require("sequelize");

router.post("/", (req, res) => {
    Post.findAll({
        where: {
            [Op.or]: [
                {
                    id: {
                        [Op.or]: req.body.tags,
                    },
                },
                {
                    difficulty_id: {
                        [Op.eq]: req.body.difficulty,
                    },
                },
                {
                    type_id: {
                        [Op.eq]: req.body.type,
                    },
                },
            ],
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
            { model: Tags, attributes: ["title"] },
            { model: Difficulty, attributes: ["difficulty"] },
            { model: Type, attributes: ["type"] },
        ],
    })

    .then((dbPostData) => {
        const posts = dbPostData.map((post) => {
            post.dataValues.loggedIn = req.session.loggedIn;
            return post.get({ plain: true });
        });
        res.render("filtered-exercises", {
            posts,
        });
    });
});

module.exports = router;
