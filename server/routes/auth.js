const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail já existente" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Usuário cadastrado com exito!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ error: "Usuário não encontrado no sistema" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, "secreta", {
      expiresIn: "1h",
    });

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar login" });
  }
});

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(401).json({ error: "O token não foi fornecido" });

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

module.exports = router;
