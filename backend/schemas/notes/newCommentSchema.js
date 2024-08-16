const Joi = require('joi');

const newCommentSchema = Joi.object({
    content: Joi.string().max(500).required()
});

module.exports = newCommentSchema;
