const jwt = require("jsonwebtoken");
const user = require("../model/user.model");

const auth = async (req, res, next) => {
  try {
    const bear = req.headers["authorization"];
    if (!bear || !bear.startsWith("Bearer")) {
       return res.status(401).json({ success: false, message: "No token provided. Please log in." });
    
      // return .status(401).d("There is no token. Try again ...")
    }
    const token = bear.split(" ")[1];

    const { email, id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const data = await user.findOne({ email, _id: id });
    if (!data) {
    return res.status(401).json({ success: false, message: "User not found or unauthorized." });
      // return .status(401).send("You are not authorized. Try again ...")
    }
    req.user = data.id;
    res.json({ success: true, message: "You are authorized",id: data._id, email: data.email, fullname: data.fullname                 });
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
       return res.status(403).json({ success: false, message: "Session expired or invalid token. Please log in again." });
      //return .status(403).send("Session expired or invalid token. Please log in again.");
    }
    return res.status(500).json({ success: false, message: `There is an error in middleware ${error}` })    ;
  }
};
module.exports = auth;
