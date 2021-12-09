const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {
    static vote(body, models) {
        console.log(body)
        return models.Votes.create({
            user_id: body.user_id,
            post_id: body.post_id,
        }).then(() => {
            return models.Post.findOne({
                where: {
                    id: body.post_id,
                },
                attributes: [
                    "id",
                    "title",
                    "description",
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
                        model: models.Comment,
                        attributes: [
                            "id",
                            "comment_text",
                            "user_id",
                            "post_id",
                            "created_at",
                            [
                                sequelize.literal(
                                    "(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)"
                                ),
                                "comment_count",
                            ],
                        ],
                        include: {
                            model: models.User,
                            attributes: ["username"],
                        },
                    },
        
                ],
            })
        })
    }
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        description: {
            type: DataTypes.STRING(2000),
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        img_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "picture",
                key: "id",
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "type",
                key: "id",
            },
        },
        difficulty_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "difficulty",
                key: "id",
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "post",
    }
);

module.exports = Post;
