import { pool } from '../config/database.js';
import session from 'express-session';

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Por favor, selecciona una imagen.' });
        }

        const { filename, path: filePath, originalname, mimetype } = req.file;
        const size = Number(req.file.size); // Convertir a número

        const query = `
    INSERT INTO images_posts (filename, path, originalname, mimetype, size)
    VALUES (?, ?, ?, ?, ?)
`;

        const values = [filename, filePath, originalname, mimetype, size];
        const result = await pool.query(query, values);

        if (result.affectedRows === 1) {
            // Obtener el ID del último INSERT
    const imageId = result.insertId; // Aquí se obtiene el ID autoincremental generado por la base de datos

    req.session.imageId = imageId;

    return res.status(201).json({ code: 201, message: 'Imagen subida correctamente' });
}

        return res.status(500).json({ code: 500, message: 'Ocurrió un error al guardar la imagen' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Error al subir la imagen', error: error.message });
    }
};
