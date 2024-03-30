const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const authMiddleware = (role) => async (req, res, next) => {
  try {
    const data = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    // const tokenFromheaders = req.authorization.split(" ")[1];
    const payload = jwt.decode(req.headers.authorization);
    if (role.includes(payload.role)) {
      const user = await UserModel.findById(payload.id);
      // console.log(user);
      req.user = user;
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }
};

module.exports = authMiddleware;
