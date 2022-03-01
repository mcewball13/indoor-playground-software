const router = require("express").Router();
const { CustomerGuardian, CustomerMinor } = require("../../models");

// get all users
router.get("/", async (req, res) => {
    try {
        const guardianData = await CustomerGuardian.findAll({});
        res.json(guardianData);
    } catch (error) {
        res.status(500).statusMessage(error);
    }
});

router.get("/:id", (req, res) => {
    User.findOne({
        attributes: { exclude: ["password"] },
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Post,
                attributes: ["id", "title", "post_url", "created_at"],
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "created_at"],
                include: {
                    model: Post,
                    attributes: ["title"],
                },
            },
            {
                model: Post,
                attributes: ["title"],
                through: Votes,
                as: "voted_posts",
            },
        ],
    })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/", async (req, res) => {
    const newCustomerData = await CustomerGuardian.create({...req.body.guardians, isAccountOwner: true});
    console.log(req.body);
    // map through minor array and add customeguardian id to each minor
    const minorsWithId = req.body.minors.map(minor => {
        return {
            ...minor,
            guardian_id: newCustomerData.id,
        };
    });
    console.log(minorsWithId);
    const newcustomerMinorData = await CustomerMinor.bulkCreate(minorsWithId);
    res.status(200).json({newCustomerData, newcustomerMinorData});
});


router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((dbUserData) => {
        if (!dbUserData) {
            res.status(400).json({
                message: "No user with that email address!",
            });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: "Incorrect password!" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: "You are now logged in!" });
        });
    });
});
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put("/:id", (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id,
        },
    })
        .then((dbUserData) => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
