import { pool } from "../config/database.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import session from 'express-session';

export const getUser = async (req, res, next) => {
    const user = await pool.query('SELECT * FROM users');

    return res.status(200).json({code : 200, message : user});

}

export const signInUser = async (req, res, next) => {
  const { first_names, last_names, email, password, phone_Number } = req.body;

  // Verifica si se proporcionó un valor para Rol_Id en el cuerpo de la solicitud.
  // Si no se proporciona, se asigna el valor predeterminado de 0.
  const rolValue = req.body.rol !== undefined ? req.body.rol : '0';
  
  // Asigna el valor correspondiente a role según el valor de rol
  const roleValue = rolValue === '1' ? "Administrador" : "Usuario";

  // Obtén el timestamp actual en formato DATETIME.
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // Encripta el password
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  // Realiza la inserción en la base de datos
  if (first_names && last_names && email && password && phone_Number) {
      try {
          const user = await pool.query(`
              INSERT INTO users (first_names, last_names, email, password, rol, role, phone_Number, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `, [first_names, last_names, email, encryptedPassword, rolValue, roleValue, phone_Number, createdAt]);

          if (user.affectedRows == 1) {
              return res.status(201).json({ code: 201, message: "Usuario registrado correctamente.", rol: rolValue });
          }

          return res.status(500).json({ code: 500, message: "Ocurrió un error." });
      } catch (error) {
          console.error(error);
          return res.status(500).json({ code: 500, message: "Ocurrió un error en la base de datos." });
      }
  } else {
      return res.status(400).json({ code: 400, message: "Campos incompletos, por favor completa el formulario." });
  }
};




export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ code: 400, message: "Campos incompletos" });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    const rows = await pool.query(query, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
    }


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
  
      

      return res.status(200).json({ code: 200, message: "Inicio de sesión exitoso", token, user_id: rows[0].Id });
      
    } catch (error) {
      return next(error);
    const validPassword = await bcrypt.compare(password, rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
    }

    const token = jwt.sign({
      user_id: rows[0].id,
      user_email: rows[0].email
    }, "your-secret-key");

    req.session.userid = user_id
      
    return res.status(200).json({ code: 200, message: "Inicio de sesión exitoso", token, user_id: rows[0].id });
  } catch (error) {
    return next(error);
  }
};

  

export const configUser = async (req, res, next) => {
    try {
        const { userId, updatedFields } = req.body;

        // Verifica si se proporcionó el ID del usuario y los campos actualizados.
        if (!userId || !updatedFields) {
            return res.status(400).json({ code: 400, message: "Parámetros incompletos" });
        }

        // Construye la consulta de actualización dinámica.
        const updateQuery = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');

        // Ejecuta la consulta de actualización.
        const result = await pool.query(`UPDATE users SET ${updateQuery} WHERE Id = ?`, [...Object.values(updatedFields), userId]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ code: 200, message: "Usuario actualizado correctamente." });
        } else {
            return res.status(404).json({ code: 404, message: "Usuario no encontrado." });
        }
    } catch (error) {
        return next(error);
    }
};

