import jwt from "jsonwebtoken";

export const auth = (req,res,next) => {
    try{
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "your-secret-key");
      req.user = decoded;
      next();
    }
    catch (error){
      return res.status(401).json({code: 401, message : "Te voy a ser franco, lo que se chingo fue el jasguer :("});
    }
}