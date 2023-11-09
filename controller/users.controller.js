import { pool } from "../config/database.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const getUser = async (req, res, next) => {
    const user = await pool.query('SELECT * FROM users');

    return res.status(200).json({code : 200, message : user});

}

export const signInUser = async (req, res, next) => {
    const { First_names, Last_names, Email, Password, Phone_Number, Rol_Id } = req.body;

    // Verifica si se proporcionó un valor para Rol_Id en el cuerpo de la solicitud.
    // Si no se proporciona, se asigna el valor predeterminado de 0.
    const roleValue = Rol_Id !== undefined ? (Rol_Id === 1 ? "Administrador" : "Usuario") : "Usuario";

    // Si no se proporcionó Rol_Id, asignar el valor predeterminado de 0.
    const roleId = Rol_Id !== undefined ? Rol_Id : 0;

    // Obtén el timestamp actual en formato DATETIME.
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Encripta el password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(Password, salt);

    // Realiza la inserción en la base de datos
    if (First_names && Last_names && Email && Password && Phone_Number) {
        const user = await pool.query(`INSERT INTO users (First_names, Last_names, Email, Password, Role, Phone_Number, Created_at, Rol_Id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [First_names, Last_names, Email, encryptedPassword, roleValue, Phone_Number, createdAt, roleId]);

        if (user.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario registrado correctamente." });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error." });
    } else {
        return res.status(400).json({ code: 400, message: "Campos incompletos, por favor completa el formulario." });
    }
};



export const loginUser = async (req, res, next) => {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({ code: 400, message: "Campos incompletos" });
        }

        const query = 'SELECT * FROM users WHERE Email = ?';
        const rows = await pool.query(query, [Email]);

        if (rows.length === 0) {
            return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
        }

        const validPassword = await bcrypt.compare(Password, rows[0].Password); 
        if (!validPassword) {
            return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
        }

        const token = jwt.sign({
            user_id: rows[0].Id, 
            user_email: rows[0].Email 
        }, "your-secret-key");

        return res.status(200).json({ code: 200, message: "Inicio de sesión exitoso", token });
    } catch (error) {
        return next(error);
    }
};
