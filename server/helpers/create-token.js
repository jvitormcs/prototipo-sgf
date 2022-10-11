const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    // payload data
    {
      id: user.id_user,
      name: user.nome_user,
      email: user.email_user
    },
    "D!RMJik2Q45ZnXx!CRkZ",{expiresIn: '48h'}
  );

  // return token
  res.status(200).json({
    message: "Você está autenticado!",
    token: token,
    dadosUser:{
      userId: user.id_user,
      nome: user.nome_user,
      email: user.email_user
    }
  });
};

module.exports = createUserToken;
