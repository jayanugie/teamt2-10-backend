// import bcrypt untuk password
const bcrypt = require("bcrypt");

// import jwt
const jwt = require("jsonwebtoken");

// import models
const { user_game } = require("../models");

// baca kunci JWT dari env, jika tidak ada gunakan nilai default
const jwtKey = process.env.JWT_KEY || "secret";

const login = async (req, res) => {
  // baca email & password dari request body
  const email = req.body.email;
  const password = req.body.password;

  // cari user yang sesuai dengan email
  const userData = await user_game.findOne({
    where: { email: email },
  });

  // jika user tidak ditemukan
  if (!userData) {
    return res.status(401).json({
      message: "User tidak terdaftar.",
    });
  }

  // bandingkan password secara async, jika ingin secara sync gunakan .compareSync()
  let isPasswordMatch = await bcrypt.compare(password, userData.password);

  // jika password tidak sesuai
  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "Password salah.",
    });
  }

  // buat token payload
  const tokenPayload = {
    id: userData.id,
    email: userData.email,
    roles: userData.roles,
  };

  // buat token
  const token = jwt.sign(tokenPayload, jwtKey);

  // kirim response ke client
  return res.status(200).json({
    message: "Login berhasil.",
    data: {
      id: userData.id,
      email: userData.email,
      roles: userData.roles,
      token: token,
    },
  });
};

const register = async (req, res) => {
  // baca email & password dari request body
  const email = req.body.email;
  const password = req.body.password;
  const role = "PlayerUser"; // secara default, berikan role PlayerUser pada user baru

  // cari user yang sesuai dengan email
  const alreadyRegistered = await user_game.findOne({
    where: { email: email },
  });

  // jika user sudah terdaftar
  if (alreadyRegistered) {
    return res.status(401).json({
      message: "User sudah terdaftar.",
    });
  }

  // encrypt password
  const encryptedPassword = await bcrypt.hash(password, 10);

  // buat user baru
  const newUser = await user_game.create({
    email: email,
    password: encryptedPassword,
    role: role,
  });

  // buat response
  return res.status(200).json({
    message: "Registrasi berhasil.",
    data: {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    },
  });
};

const showPlayers = (req, res) => {
  let userData = [];
  user_game.findAll({
    order: [
      ["id", "ASC"]
    ]
  })
  .then(users => {
    res.status(200).json({
      message: "Berhasil ditampilkan",
      data: {
        users: users
      }
    });
  })
  .catch(err => {
    res.status(404).json({
      message: "Gagal memuat data"
    });

  }) 
}



module.exports = {
  login,
  register,
  showPlayers
};
