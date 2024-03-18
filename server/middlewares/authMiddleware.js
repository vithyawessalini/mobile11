import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

 //Protected Routes token base


export const requireSignIn = (req, res, next) => {
  const token = req.headers.authorization;
  JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid Token",
      });
    }
    req.user = decoded;
    next();
  });
};


//admin access
export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middleware",
      });
    }
  };
  
