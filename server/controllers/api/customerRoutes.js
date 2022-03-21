const router = require("express").Router();
const {
    CustomerGuardian,
    CustomerMinor,
    CustomerGuardianHasCustomerMinor,
} = require("../../models");
const { signToken } = require("../../utils/auth");

// get all users
router.get("/", async (req, res) => {
    try {
        const guardianData = await CustomerGuardian.findAll({});
        res.json(guardianData);
    } catch (error) {
        res.status(500).statusMessage(error);
    }
});

router.get("/:id", async (req, res) => {
    const customerGuardianData = await CustomerGuardian.findOne({
        attributes: { exclude: ["password"] },
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: CustomerMinor,
                through: CustomerGuardianHasCustomerMinor,
                as: "minors",
            },
        ],
    });
    res.status(200).json(customerGuardianData);
});
// check to see if email exists on blur from email field
router.get("/email/:email", async (req, res) => {
    const customerGuardianData = await CustomerGuardian.findOne({
        attributes: { exclude: ["password"] },
        where: {
            email: req.params.email,
        },
        include: [
            {
                model: CustomerMinor,
                through: CustomerGuardianHasCustomerMinor,
                as: "minors",
            },
        ],
    });
    res.status(200).json(customerGuardianData);
});

router.post("/new", async (req, res) => {
    try {
        const newCustomerData = await CustomerGuardian.create({
            ...req.body.guardians,
            isAccountOwner: true,
        });
        console.log(req.body);
        // map through minor array and add customeguardian id to each minor
        const minorsWithIdArr = req.body.minors.map((minor) => {
            return {
                ...minor,
                guardian_id: newCustomerData.id,
            };
        });
        console.log(minorsWithIdArr);
        const newCustomerMinorDataArr = await CustomerMinor.bulkCreate(
            minorsWithIdArr
        );
        // map through newCusomerMinoeDataArr and add customeguardian id to each minor create cusomterguardianhascustomerminor
        newCustomerMinorDataArr.map(async (minor) => {
            await CustomerGuardianHasCustomerMinor.create({
                guardian_id: newCustomerData.id,
                minor_id: minor.id,
            });
        });
        // const token = signToken({id: newCustomerData.id, email: newCustomerData.email});

        // test user created by mui assets api
        const token = signToken({
            id: "8864c717-587d-472a-929a-8e5f298024da-0",
            displayName: "Jaydon Frankie",
            email: "demo@minimals.cc",
            password: "demo1234",
            photoURL:
                "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_default.jpg",
            phoneNumber: "+40 777666555",
            country: "United States",
            address: "90210 Broadway Blvd",
            state: "California",
            city: "San Francisco",
            zipCode: "94116",
            about: "Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.",
            role: "admin",
            isPublic: true,
        });

        res.status(200).json({
            customer: { newCustomerData, newCustomerMinorDataArr },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
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
