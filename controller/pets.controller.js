import { pool } from '../config/database.js';

export const getPets = async (req, res, next) => {
    

    const pet = await pool.query('SELECT * FROM pets');
    return res.status(200).json({code : 1, message : pet });
}
export const postPet = async (req, res, next) => {
    const { name, breed, type, pet_Size, age, description, owner, allergies, exercise_ability, status } = req.body;

    if (name && breed && type && pet_Size && age && description && owner && allergies && exercise_ability && status) {
        try {
            const query = `
                INSERT INTO pets (name, breed, type, pet_Size, age, description, owner, allergies, exercise_ability, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [name, breed, type, pet_Size, age, description, owner, allergies, exercise_ability, status];
            const rows = await pool.query(query, values);

            if (rows.affectedRows === 1) {
                // Obtenemos el ID de la mascota recién insertada
                const { insertId } = rows;

                req.session.petId = insertId;
                
                // Pasamos el ID a la ruta "posts/" como idPet
                return res.status(201).json({ code: 201, message: 'Mascota guardada correctamente :)'});
            }
            return res.status(500).json({ code: 500, message: 'Ocurrió un error al guardar la mascota' });
        } catch (error) {
            return res.status(500).json({ code: 500, message: 'Error en la inserción de la mascota', error: error.message });
        }
    }
    return res.status(400).json({ code: 400, message: 'Campos incompletos' });
};