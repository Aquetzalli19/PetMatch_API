import { pool } from '../config/database.js'
import fs from 'fs';
import path from 'path';

export const getPosts = async (req, res, next) => {
    try {
        // URL base del servidor
        const baseUrl = 'http://localhost:3000';

        const query = `
        SELECT 
        posts.id AS post_id,
        posts.date AS post_date,
        pets.*,
        images_posts.filename AS image_filename
    FROM 
        posts
    INNER JOIN 
        pets ON posts.pet = pets.id
    LEFT JOIN 
        images_posts ON posts.img = images_posts.id;
`;
        
        const posts = await pool.query(query);
        
        // Mapea las rutas de las imágenes a URLs completas
        const postsWithUrls = posts.map(post => {
            if (post.image_filename) {
                post.image_path = path.join(baseUrl, '/images/uploads/imagesPosts/', post.image_filename);
            }
            return post;
        });

        return res.status(200).json({ code: 1, message: postsWithUrls });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Error al obtener los posts', error: error.message });
    }
};

export const uploadPost = async (req, res, next) => {

    console.log(req.session);

    const imageId = req.session.imageId;
    const petId = req.session.petId;

    try {
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato correcto de fecha

        const query = `
            INSERT INTO posts (date, pet, img)
            VALUES (?, ?, ?)
        `;
        const values = [currentDate, petId, imageId];
        const result = await pool.query(query, values);

        if (result.affectedRows === 1) {
            delete req.session.imageId; // Eliminar la variable de sesión
            delete req.session.petId; // Eliminar la variable de sesión
            return res.status(201).json({ code: 201, message: 'Publicación creada correctamente' });
        }
        return res.status(500).json({ code: 500, message: 'Error al crear la publicación' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Error al subir la publicación', error: error.message });
    }
};

export const deletePost = async (req, res, next) => {
    const idPost = req.params.id;

    try {
        const query = `DELETE FROM posts WHERE id = ?`;
        const result = await pool.query(query, [idPost]);

        if (result.affectedRows === 1) {
            return res.status(200).json({ code: 200, message: `Publicación con ID ${idPost} eliminada correctamente` });
        }
        return res.status(404).json({ code: 404, message: `Publicación con ID ${idPost} no encontrada` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Error al eliminar la publicación', error: error.message });
    }
};

export const reportPost = async (req, res, next) => {
    const postId = req.params.id; // Suponiendo que el ID está en la ruta
    const reportMessage = req.body.report; // Mensaje del reporte desde la solicitud

    try {
        const query = `
            UPDATE posts
            SET status = 1, report = ?
            WHERE id = ?
        `;
        const result = await pool.query(query, [reportMessage, postId]);

        if (result.affectedRows === 1) {
            return res.status(200).json({ code: 200, message: `Estado del post con ID ${postId} actualizado a 1 y reporte añadido` });
        }
        return res.status(404).json({ code: 404, message: `No se encontró un post con ID ${postId}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Error al actualizar el estado del post y añadir reporte', error: error.message });
    }
};


export const updatePostStatus = async (req, res, next) => {
    const postId = req.params.id; // Suponiendo que el ID está en la ruta

    try {
        const query = `
            UPDATE posts
            SET status = 0
            WHERE id = ?
        `;
        const result = await pool.query(query, [postId]);

        if (result.affectedRows === 1) {
            return res.status(200).json({ code: 200, message: `Estado del post con ID ${postId} actualizado a 1` });
        }
        return res.status(404).json({ code: 404, message: `No se encontró un post con ID ${postId}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Error al actualizar el estado del post', error: error.message });
    }
};

export const getPostsReported = async (req, res, next) => {
    try {
        const baseUrl = 'http://localhost:3000';

        const query = `
            SELECT 
                posts.id AS post_id,
                posts.date AS post_date,
                pets.*,
                images_posts.filename AS image_filename
            FROM 
                posts
            INNER JOIN 
                pets ON posts.pet = pets.id
            LEFT JOIN 
                images_posts ON posts.img = images_posts.id
            WHERE 
                posts.status = 1;
        `;
        
        const posts = await pool.query(query);
        
        const postsWithUrls = posts.map(post => {
            if (post.image_filename) {
                post.image_path = `${baseUrl}/images/uploads/imagesPosts/${post.image_filename}`;
            }
            return post;
        });

        return res.status(200).json({ code: 1, message: postsWithUrls });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Error al obtener los posts', error: error.message });
    }
}

export const getPostsFilteredByPreferences = async (req, res) => {
    try {
        const userId = req.headers['userid']; // Accediendo al ID de usuario desde los encabezados
        console.log(userId); // Verificar si el ID de usuario se está recibiendo correctamente

        if (!userId) {
            return res.status(400).json({ code: 400, message: 'Falta el ID de usuario en los encabezados' });
        }

        // Obtener las preferencias del usuario desde la base de datos
        const userPreferences = await pool.query('SELECT * FROM preferences WHERE user_Id = ?', [userId]);

        console.log(userPreferences);

        // Mapear el tamaño de la vivienda a los tamaños de mascotas correspondientes
        const petSizeMapping = {
            'Pequeno': 'Pequeno',
            'Mediano': 'Mediano',
            'Grande': 'Grande'
        };

        // Obtener el tamaño de mascota correspondiente al tamaño de vivienda del usuario
        const userPetSize = petSizeMapping[userPreferences[0].housing_Type];


        // Construir la consulta para obtener posts filtrados por las preferencias del usuario
        const query = `
            SELECT 
                posts.id AS post_id,
                posts.date AS post_date,
                pets.*,
                images_posts.filename AS image_filename
            FROM 
                posts
            INNER JOIN 
                pets ON posts.pet = pets.id
            LEFT JOIN 
                images_posts ON posts.img = images_posts.id
            WHERE
                pets.type = ? OR 
                pets.pet_Size = ? AND
                pets.outdoor_Time = ? AND
                pets.allergies = ? AND
                pets.exercise_ability = ? AND
                pets.weather = ?;
        `;

        // Obtener los valores de las preferencias del usuario y realizar la consulta filtrada
        const result = await pool.query(query, [
            userPetSize,
            userPreferences[0].outdoor_Time,
            userPreferences[0].allergies,
            userPreferences[0].exercise_ability,
            userPreferences[0].weather
        ]);

        console.log(result);

        return res.status(200).json({ code: 200, message: result });

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Error al obtener los posts filtrados por preferencias', error: error.message });
    }
};



export const getPostsByOwner = async (req, res) => {
    try {
        const userId = req.session.userid; // Obtener el ID del usuario de la sesión

        const query = `
            SELECT 
                posts.id AS post_id,
                posts.date AS post_date,
                pets.*,
                images_posts.filename AS image_filename
            FROM 
                posts
            INNER JOIN 
                pets ON posts.pet = pets.id
            LEFT JOIN 
                images_posts ON posts.img = images_posts.id
            WHERE 
                pets.owner = ?;
        `;
        
        const posts = await pool.query(query, [userId]);
        
        // Mapear las rutas de las imágenes a URLs completas
        const baseUrl = 'http://localhost:3000';
        const postsWithUrls = posts.map(post => {
            if (post.image_filename) {
                post.image_path = `${baseUrl}/images/uploads/imagesPosts/${post.image_filename}`;
            }
            return post;
        });

        return res.status(200).json({ code: 1, message: postsWithUrls });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Error al obtener los posts del usuario', error: error.message });
    }
};
