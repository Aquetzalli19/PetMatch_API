import { pool } from '../config/database.js'

// Obtener todos los posts de la comunidad
export const getAllCommunityPosts = async (req, res) => {
    try {
        const query = 'SELECT * FROM posts_community';
        const posts = await pool.query(query);

        return res.status(200).json({ code: 200, message: 'Lista de posts de la comunidad', posts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Error al obtener los posts de la comunidad', error: error.message });
    }
};

// Obtener posts de la comunidad filtrados por ID de usuario
export const getCommunityPostsByUserId = async (req, res) => {
    const userId = req.params.id;

    try {
        const query = 'SELECT * FROM posts_community WHERE user_id = ?';
        const posts = await pool.query(query, [userId]);

        if (posts.length === 0) {
            return res.status(404).json({ code: 404, message: 'No se encontraron posts para este usuario' });
        }

        return res.status(200).json({ code: 200, message: 'Posts de la comunidad filtrados por ID de usuario', posts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Error al obtener los posts de la comunidad por ID de usuario', error: error.message });
    }
};

export const addCommunityPost = async (req, res) => {
    try {
        const { user_id, Comment, Date } = req.body;

        // Verificar que se proporcionen todos los campos necesarios
        if (!user_id || !Comment || !Date) {
            return res.status(400).json({ code: 400, message: 'Campos incompletos' });
        }

        // Insertar el nuevo post de la comunidad en la base de datos
        const query = 'INSERT INTO posts_community (user_id, Comment, Date) VALUES (?, ?, ?)';
        const result = await pool.query(query, [user_id, Comment, Date]);

        if (result.affectedRows === 1) {
            return res.status(201).json({ code: 201, message: 'Community post agregado correctamente' });
        }

        return res.status(500).json({ code: 500, message: 'Error al agregar el community post' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Error al agregar el community post', error: error.message });
    }
};
