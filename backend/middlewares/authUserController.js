const jwt = require('jsonwebtoken');

const {
    notAuthenticatedError,
    invalidTokenError,
} = require('../services/errorService');

const authUserController = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return notAuthenticatedError();
        }

        try {
            const userInfo = jwt.verify(authorization, process.env.SECRET);
            req.user = userInfo;
            next();
        } catch (err) {
            console.error(err);
            return invalidTokenError();
        }
    } catch (err) {
        next(err);
    }
};

module.exports = authUserController;
