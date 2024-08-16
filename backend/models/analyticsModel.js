const getDb = require('../db/getDb');

// Función para crear eventos
const createEvent = async (eventType, user_id) => {
    let connection;

    try {
        connection = await getDb();
        const sql = 'INSERT INTO analytics (event_type, user_id) VALUES (?, ?)';
        await connection.query(sql, [eventType, user_id]);
    } finally {
        if (connection) connection.release();
    }
};

// Función para obtener el conteo de eventos con fechas
const getEventCountsFromDB = async () => {
    let connection;

    try {
        connection = await getDb();

        const signUpCountsQuery = `
            SELECT DATE(created_at) as date, COUNT(*) as count
            FROM analytics
            WHERE event_type = "sign_up"
            GROUP BY DATE(created_at)
            ORDER BY DATE(created_at)
        `;
        
        const noteCreatedCountsQuery = `
            SELECT DATE(created_at) as date, COUNT(*) as count
            FROM analytics
            WHERE event_type = "note_created"
            GROUP BY DATE(created_at)
            ORDER BY DATE(created_at)
        `;

        const [signUpCountsResult] = await connection.query(signUpCountsQuery);
        const [noteCreatedCountsResult] = await connection.query(noteCreatedCountsQuery);

        return {
            signUpData: signUpCountsResult.map(row => ({ date: row.date, count: row.count })),
            noteCreatedData: noteCreatedCountsResult.map(row => ({ date: row.date, count: row.count })),
        };
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    createEvent,
    getEventCountsFromDB
};
