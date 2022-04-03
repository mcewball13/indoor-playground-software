const router = require("express").Router();
const {
    CustomerGuardian,
    CustomerMinor,
    CustomerGuardianHasCustomerMinor,
} = require("../../../models");
const { signToken } = require("../../../utils/auth");

// api/auth/customers

router.post("/login", async (req, res) => {
    console.log("login route");
    try {
        const existingCustomerData = await CustomerGuardian.findOne({
            where: {
                email: req.body.email,
            },
            include: [
                {
                    model: CustomerMinor,
                    through: CustomerGuardianHasCustomerMinor,
                    as: "minors",
                },
            ],
        });
        if (!existingCustomerData) {
            res.status(400).json({
                message: "Invalid User name or password",
            });
            return;
        }
        ;

        const validPassword = await existingCustomerData.checkPassword(
            req.body.password
        );
console.log("validPassword", validPassword);
        if (!validPassword) {
            res.status(400).json({ message: "Invalid User name or password" });
            return;
        }
        const { id, email } = existingCustomerData.dataValues;
        const accessToken = await signToken({id, email});

        res.json({
            customer: { existingCustomerData },
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
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
    CustomerGuardian.update(req.body, {
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
    CustomerGuardian.destroy({
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
