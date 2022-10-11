const jwt = require("jsonwebtoken");

const User = require("../models/modelUser");

// get user by jwt token
const getUserByToken = async (token) => {
  if (!token) {
    res.status(401).json({ error: "Acesso negado!" });
    return
  }

  // find user
  const decoded = jwt.verify(token, "D!RMJik2Q45ZnXx!CRkZ");

  const userId = decoded.id;

  const user = await User.findOne( {where: { id_user: userId }});

  return user;
};

module.exports = getUserByToken;
