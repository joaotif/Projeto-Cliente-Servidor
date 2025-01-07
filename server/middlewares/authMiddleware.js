const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res
        .status(401)
        .json({ error: "O token não foi fornecido corretamente" });

    const token = authHeader.split(" ")[1];

    jwt.verify(token, "secreta", (err, user) => {
      if (err) return res.status(403).json({ error: "Token incorreto" });

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ error: "Acesso não autorizado" });
      }

      req.user = user;
      next();
    });
  };
};

module.exports = authMiddleware;
