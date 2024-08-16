const { createEvent, getEventCountsFromDB } = require('../models/analyticsModel');

// Controlador para registrar el evento de registro
const registerSignUpEvent = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        await createEvent('sign_up', user_id);
        res.status(201).json({ status: "ok", message: "Sign-up event registered" });
    } catch (err) {
        next(err);
    }
};

// Controlador para registrar el evento de creación de nota
const registerNoteCreatedEvent = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        await createEvent('note_created', user_id);
        res.status(201).json({ status: "ok", message: "Note created event registered" });
    } catch (err) {
        next(err);
    }
};

// Controlador para obtener el conteo de eventos
const getEventCounts = async (req, res, next) => {
    try {
        const counts = await getEventCountsFromDB();
        res.status(200).json(counts);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    registerSignUpEvent,
    registerNoteCreatedEvent,
    getEventCounts
};
