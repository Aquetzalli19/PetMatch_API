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
                pets.id AS pet_id,
                pets.name AS pet_name,
                pets.breed AS pet_breed,
                pets.type AS pet_type,
                pets.pet_Size AS pet_size,
                pets.age AS pet_age,
                pets.description AS pet_description,
                pets.owner AS pet_owner_id,
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

    try {
        const query = `
            UPDATE posts
            SET status = 1
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
                pets.id AS pet_id,
                pets.name AS pet_name,
                pets.breed AS pet_breed,
                pets.type AS pet_type,
                pets.pet_Size AS pet_size,
                pets.age AS pet_age,
                pets.description AS pet_description,
                pets.owner AS pet_owner_id,
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