import { pool } from '../config/database.js';
import session from 'express-session';
import user from '../routes/users.routes.js';

// Controlador para la creación de preferencias
export const createPreferences = async (req, res) => {
  try {
    // Obtener el user_id de la sesión
    const userId = req.session.userid;

    if (!userId) {
      return res.status(401).json({ code: 401, message: "Usuario no autenticado" });
    }

    const { Housing_Type, Allergies, Exercise_ability, Category, Outdoor_Time, Weather } = req.body;

    // Verificar si ya existen preferencias para este usuario
    const existingPreferences = await pool.query('SELECT * FROM preferences WHERE User_Id = ?', [userId]);

    if (existingPreferences.length > 0) {
      return res.status(400).json({ message: 'El usuario ya tiene preferencias registradas' });
    }

    // Realizar la inserción de preferencias utilizando userId
    const insertSql = 'INSERT INTO preferences (User_Id, Housing_Type, Allergies, Exercise_ability, Category, Outdoor_Time, Weather) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const insertValues = [userId, Housing_Type, Allergies, Exercise_ability, Category, Outdoor_Time, Weather];

    const result = await pool.query(insertSql, insertValues);

    if (result.affectedRows === 1) {
      return res.status(201).json({ code: 201, message: 'Preferencias registradas correctamente' });
    }
  } catch (error) {
    console.error('Error al interactuar con la base de datos:', error);
    res.status(500).json({ error: 'Error en la conexión con la base de datos' });
  }
};

// Controlador para la actualización de preferencias
export const updatePreferences = async (req, res) => {
  try {
    // Obtener el user_id de la sesión
    const userId = req.session.userid;

    if (!userId) {
      return res.status(401).json({ code: 401, message: "Usuario no autenticado" });
    }

    const { Housing_Type, Allergies, Exercise_ability, Category, Outdoor_Time, Weather } = req.body;

    // Verificar si existen preferencias para este usuario
    const existingPreferences = await pool.query('SELECT * FROM preferences WHERE User_Id = ?', [userId]);

    if (existingPreferences.length === 0) {
      return res.status(404).json({ message: 'No se encontraron preferencias para el usuario' });
    }

    // Realizar la actualización de preferencias utilizando userId
    const updateSql = `
      UPDATE preferences
      SET Housing_Type = ?, Allergies = ?, Exercise_ability = ?, Category = ?, Outdoor_Time = ?, Weather = ?
      WHERE User_Id = ?
    `;
    const updateValues = [Housing_Type, Allergies, Exercise_ability, Category, Outdoor_Time, Weather, userId];

    const result = await pool.query(updateSql, updateValues);

    if (result.affectedRows === 1) {
      return res.status(200).json({ code: 200, message: 'Preferencias actualizadas correctamente' });
    } else {
      return res.status(500).json({ error: 'No se pudo actualizar las preferencias' });
    }
  } catch (error) {
    console.error('Error al interactuar con la base de datos:', error);
    return res.status(500).json({ error: 'Error en la conexión con la base de datos' });
  }
};
