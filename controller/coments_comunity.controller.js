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

export const getPostComments = async (req, res) => {
  try {
      const { postId } = req.params; // Obtener el ID del post de comunidad de los parámetros de la ruta

      const query = `
          SELECT 
              comments_community.Id,
              comments_community.Post_id,
              comments_community.User_id,
              comments_community.Coment,
              comments_community.Date,
              users.first_names,
              users.last_names
          FROM 
              comments_community
          INNER JOIN 
              users ON comments_community.User_id = users.id
          WHERE 
              comments_community.Post_id = ?;
      `;

      const comments = await pool.query(query, [postId]);

      res.status(200).json({ code: 200, comments });
  } catch (error) {
      console.error('Error al obtener comentarios de la base de datos:', error);
      res.status(500).json({ error: 'Error al obtener los comentarios del post de comunidad' });
  }
};

