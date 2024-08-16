const newUserModel = require('../../models/users/newUserModel');
const { createEvent } = require('../../models/analyticsModel');
const { missingFieldsError } = require('../../services/errorService');
const validateSchema = require('../../utils/validateSchema');
const newUserSchema = require('../../schemas/users/newUserSchema');

const newUserController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        await validateSchema(newUserSchema, req.body);

        if (!username || !email || !password) {
            missingFieldsError();
        }

        const user = await newUserModel(username, email, password);
        console.log('User:', user);

        // Registramos el evento de sign-up en la tabla analytics
        await createEvent('sign_up', user.id);
        res.send({
            status: 'Ok',
            message: 'User created successfully',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUserController;
