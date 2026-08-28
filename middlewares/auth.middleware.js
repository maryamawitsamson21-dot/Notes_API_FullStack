const jwt = require("jsonwebtoken");
const user = require("../model/user.model");

const auth = async (req, res, next) => {
  try {
    const bear = req.headers["authorization"];
    if (!bear || !bear.startsWith("Bearer")) {
      res.sendFile(path.join(__dirname, "../frontend/others", "index.html"));
      // return .status(401).send("There is no token. Try again ...")
    }
    const token = bear.split(" ")[1];

    const { email, id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const data = await user.findOne({ email, _id: id });
    if (!data) {
      res.sendFile(path.join(__dirname, "../frontend/others", "index.html"));
      // return .status(401).send("You are not authorized. Try again ...")
    }
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      res.sendFile(path.join(__dirname, "../frontend/others", "index.html"));
      //return .status(403).send("Session expired or invalid token. Please log in again.");
    }
    return res.status(500).send("Server error.");
  }
};
module.exports = auth;
