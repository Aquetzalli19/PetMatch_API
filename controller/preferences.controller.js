import { pool } from '../config/database.js';
import session from 'express-session';
import user from '../routes/users.routes.js';

export const postData = async (req, res) => {
  try {
    const { User_Id, Housing_Type, Allergies, Exercise_ability, Category, Outdoor_Time, Weather } = req.body;

    const existingPreferences = await pool.query('SELECT * FROM preferences WHERE User_Id = ?', [User_Id]);

    if (existingPreferences.length > 0) {
      const updateSql = `
        UPDATE preferences
        SET Housing_Type = ?, Allergies = ?, Exercise_ability = ?, Category = ?, Outdoor_Time = ?, Weather = ?
        WHERE User_Id = ?
      `;
      const updateValues = [Housing_Type, Allergies, Exercise_ability, Category, Outdoor_Time, Weather, User_Id];

      const result = await pool.query(updateSql, updateValues);

      if (result.affectedRows === 1) {
        console.log('Datos actualizados correctamente');
        req.session.preferences = { User_Id, Housing_Type, Allergies, Exercise_ability, Category, Outdoor_Time, Weather };
        res.status(200).json({ message: 'Datos actualizados correctamente' });
      } else {
        console.log('No se pudo actualizar el registro');
        res.status(500).json({ error: 'No se pudo actualizar el registro' });
      }
    } else {
      const insertSql = 'INSERT INTO preferences (User_Id, Housing_Type, Allergies, Exercise_ability, Category, Outdoor_Time, Weather) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const insertValues = [User_Id, Housing_Type, Allergies, Exercise_ability, Category, Outdoor_Time, Weather];

      const result = await pool.query(insertSql, insertValues);

      if (result.affectedRows === 1) {
        const user_id = result.insertId;
        req.session.preferences = { User_Id, Housing_Type, Allergies, Exercise_ability, Category, Outdoor_Time, Weather };
        req.session.user_id = user_id;

        return res.status(200).json({ code: 200, message: 'datos guardados' });
      }
    }
  } catch (error) {
    console.error('Error al interactuar con la base de datos:', error);
    res.status(500).json({ error: 'Error en la conexión con la base de datos' });
  }
};
