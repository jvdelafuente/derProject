const insertNotesModel = require('../../models/notes/insertNotesModel');
const { missingFieldsError } = require('../../services/errorService');
const validateSchema = require('../../utils/validateSchema');
const savePhoto = require('../../utils/savePhoto');
const newNotesSchema = require('../../schemas/notes/newNotesSchema');
const { createEvent } = require('../../models/analyticsModel');

const newNotesController = async (req, res, next) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const { title, text, image } = req.body;
        const imageFile = req.files ? req.files.image : null; // Obtiene el archivo de imagen si existe

        // Verificación de los valores recibidos
        console.log("Request Body:", req.body);
        console.log("Image File:", imageFile);

        // Validamos el esquema de entrada
        await validateSchema(newNotesSchema, {
            ...req.body,
            image: imageFile ? 'image-file' : req.body.image,
        });

        // Validamos que los campos obligatorios están presentes
        if (!title || !text) {
            missingFieldsError();
        }

        // Manejo de la imagen opcional
        let imageName = null;
        if (imageFile) {
            imageName = await savePhoto(imageFile, 150);
        } else if (req.body.image) {
            imageName = req.body.image;
        }

        // Verificación de los datos antes de la inserción
        console.log("Inserting Note:", {
            title,
            text,
            image: imageName,
            user_id: req.user.id
        });

        // Inserta la nueva nota en la base de datos
        const post_id = await insertNotesModel(
            title,
            text,
            imageName,  // Usa imageName en lugar de image
            req.user.id
        );

        // Registramos el evento de creación de nota en la tabla analytics
        await createEvent('note_created', req.user.id);

        // Construye la URL completa de la imagen
        const imageUrl = imageName ? `http://localhost:${process.env.PORT}/uploads/${imageName}` : null;
        console.log("Backend - imageUrl:", imageUrl);

        // Enviamos la respuesta con la información de la nota creada
        res.send({
            status: 'ok',
            data: {
                note: {
                    id: post_id,
                    title,
                    text,
                    image: imageUrl,
                    user_id: req.user.id,
                    created_at: new Date().toISOString(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};


module.exports = newNotesController;
