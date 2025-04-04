const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXP;

module.exports = {
    authMiddleware: function ({ req }) {
        let token =
            req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(" ").pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.employee = data;
        } catch {
            console.log("Invalid token");
        }

        return req;
    },
    signToken: function async({ email, id }) {
        const payload = { email, id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
