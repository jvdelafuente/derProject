// Importamos las dependencias.
const joi = require('joi');

// Importamos el objeto con los mensajes de error personalizados.
const joiErrorMessages = require('../joiErrorMessages');

// Creamos el esquema de validación.
const newNotesSchema = joi.object({
  title: joi.string().required().messages(joiErrorMessages),
  text: joi.string().required().messages(joiErrorMessages),
  image: joi.alternatives().try(
    joi.string().uri().allow(null, ''),
    joi.string().allow(null, '')
  ).optional(),
  url: joi.string().uri().allow('').optional().messages(joiErrorMessages),
});

module.exports = newNotesSchema;