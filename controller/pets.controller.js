import { pool } from '../config/database.js';

export const getPets = async (req, res, next) => {
    

    const pet = await pool.query('SELECT * FROM pets');
    return res.status(200).json({code : 1, message : pet });
}
export const postPet = async (req, res, next) => {
    const { name, breed, age, description, type, pet_Size, outdoor_Time, allergies, exercise_ability, weather, owner } = req.body;

    if (name && breed && description && type && pet_Size && outdoor_Time && allergies && exercise_ability && weather && owner) {
        try {
            const query = `
                INSERT INTO pets (name, breed, age, description, owner, type, pet_Size, outdoor_Time, allergies, exercise_ability, weather)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [name, breed, age, description, owner, type, pet_Size, outdoor_Time, allergies, exercise_ability, weather];
            const rows = await pool.query(query, values);

            if (rows.affectedRows === 1) {
                const { insertId } = rows;
                req.session.petId = insertId;
                return res.status(201).json({ code: 201, message: 'Mascota guardada correctamente :)'});
            }
            return res.status(500).json({ code: 500, message: 'Ocurrió un error al guardar la mascota' });
        } catch (error) {
            return res.status(500).json({ code: 500, message: 'Error en la inserción de la mascota', error: error.message });
        }
    }
    return res.status(400).json({ code: 400, message: 'Campos incompletos' });
};
