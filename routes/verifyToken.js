const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // try {
  //   const authHeader = req.headers["authorization"];
  //   const authType = authHeader && authHeader.split(" ")[0];
  //   const token = authHeader && authHeader.split(" ")[1];

  //   if (!token || authType != "Bearer") {
  //     return res.status(500).send({ error: "Invalid authorization!" });
  //   }

  //   const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  //   req.user = verified;
  //   req.userId = 1;
  //   req.userCpf = "595.080.896-84"; //req.user.cpf;
  //   req.token = token;
  //   next();
  // } catch (e) {
  //   return res.status(401).send({ error: "Invalid token!" });
  // }
  
  req.userId = 1;
  req.userCpf = "595.080.896-84"; //req.user.cpf;
  next();
};
