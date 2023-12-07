import { pool } from '../config/database.js';
export const postData = async (req, res) => {
  try {
    const { User_Id, Housing_Type, Allergies, Exercise_ability, Category, Outdoor_Time, Weather } = req.body;

    const sql = 'INSERT INTO preferences (User_Id, Housing_Type, Allergies, Exercise_ability, Category, Outdoor_Time, Weather) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    // datos a insertar
    const values = [User_Id, Housing_Type, Allergies, Exercise_ability, Category, Outdoor_Time, Weather];


    await pool.query(sql, values);
    
    console.log('Datos insertados al fin ');
    res.status(200).json({ message: 'Datos insertados correctamente' });
  } catch (error) {
    console.error('Error al insertar datos en la base de datos:', error);
    res.status(500).json({ error: 'No funciona la conexion papu' });
  }
};
