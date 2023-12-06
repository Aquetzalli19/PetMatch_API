import { pool } from '../config/database.js';
export const postComents = async (req, res) => {
    try{
  
    const {id,post_id,user_id,coment,date} = req.body;

    const sql = 'Insert into comments_community (Id, Post_id, User_id, Coment, Date) values (?,?,?,?,current_date())';

    // Datos a insertar
    const values = [id, post_id, user_id, coment, date];

    await pool.query(sql, values);
    console.log('Datos insertados al fin ');
    res.status(200).json({ message: 'Datos insertados correctamente' });
    }
    catch (error) {
        console.error('Error al insertar datos en la base de datos:', error);
        res.status(500).json({ error: 'No funciona la conexion papu' });
      }


};
